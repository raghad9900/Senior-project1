import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';

import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EventsModule } from './events/events.models';
import * as config from 'src/config.json';
import { GeneralModule } from './modules/general/general.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGODB_URI + config.MONGODB_DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'admin'),
    }),
    UsersModule,
    GeneralModule,
    EventsModule,
  ],
})
export class AppModule {}
