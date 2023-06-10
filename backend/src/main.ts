import { User } from './modules/users/dto/users.dto';
import { Auth } from './modules/users/dto/auth.dto';

import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  ValidationPipe,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Injectable,
} from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import * as compression from 'compression';

import * as config from 'src/config.json';
import * as helmet from 'helmet';

import * as bodyParser from 'body-parser';
const cron = require('node-cron');
const dbUri = 'mongodb://127.0.0.1:27017/testMedical';
const basePath = './db';
import * as Backup from 'backup-mongodb';

import moment = require('moment');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // Global
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  

  
  // Swagger
  const options = new DocumentBuilder()
    .setTitle('POS')
    .setDescription('POS API description')
    .setVersion('1.0')
    .addSecurity('basic', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // initialization file
  app.use(compression());
  app.use(helmet());

  // static folders
  app.use('/uploads', express.static(join(process.cwd(), '/uploads/')));

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(config.PORT);
  const appUrl = await app.getUrl();
  cron.schedule('0 0 * * *', () => {
    new Backup(dbUri, basePath).backup();
  });

  console.log('app started at ' + appUrl);
  console.log('api documentation ' + appUrl + '/api');
}
bootstrap();
