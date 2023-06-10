import {
  Query,
  Get,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import * as Enums from 'src/common/json/enums.json';
import { UserInfo } from '../decorator/user.decorator';

export class BaseController {
  service: any;
  Enums: any = Enums;
  constructor(services) {
    this.service = services;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() options) {
    return await this.service.findAll({}, options);
  }

  @Post('search')
  @HttpCode(HttpStatus.OK)
  async search(@Body() body, @Query() options, @UserInfo() user) {
    return await this.service.findAll(body, options);
  }


  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Post('count')
  @HttpCode(HttpStatus.OK)
  async count(@Body() body) {
    return await this.service.count(body);
  }
}
