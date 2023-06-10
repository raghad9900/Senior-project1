import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  Delete,
  HttpException,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { Notifications } from '../dto/notifications.dto';
import { NotificationsService } from '../services/notifications.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BaseController } from 'src/common/base/baseController.controller';
import { UserInfo } from 'src/common/decorator/user.decorator';


@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(AuthGuard('jwt'))
export class NotificationsController extends BaseController {
  constructor(public readonly notificationsService: NotificationsService) {
    super(notificationsService);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Notifications,
  })
  async create(@Body() body: any, @Query() q) {
    
    return await this.notificationsService.updateAll(q,body);
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: Notifications,
  })
  async update(@Param('id') id: string, @Body() body: any) {
    return await this.notificationsService.updateById(id, body);
  }
}
