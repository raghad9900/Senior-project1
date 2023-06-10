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
import { Comments } from '../dto/comments.dto';
import { CommentsService } from '../services/comments.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BaseController } from 'src/common/base/baseController.controller';
import { UserInfo } from 'src/common/decorator/user.decorator';
import { NotificationsService } from '../services/notifications.service';

@ApiTags('Comments')
@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController extends BaseController {
  constructor(
    public readonly commentsService: CommentsService,
    public readonly notificationsService: NotificationsService,
  ) {
    super(commentsService);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Comments,
  })
  async create(@Body() body: Comments, @UserInfo() user) {
    body.userId = user._id;
    const item = await this.commentsService.createFiles(body);
    await this.notificationsService.createFiles({
      body: 'Update Issue',
      issueId: item.issueId ? item.issueId._id : null,
      commentsId: item._id,
      userId: item.issueId && item.issueId.userId ? item.issueId.userId._id : null,
    });
    return item;
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: Comments,
  })
  async update(@Param('id') id: string, @Body() body: Comments) {
    return await this.commentsService.updateById(id, body);
  }
}
