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
import { Issues } from '../dto/issues.dto';
import { IssuesService } from '../services/issues.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BaseController } from 'src/common/base/baseController.controller';
import { UserInfo } from 'src/common/decorator/user.decorator';
import { NotificationsService } from '../services/notifications.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@ApiTags('Issues')
@Controller('issues')
@UseGuards(AuthGuard('jwt'))
export class IssuesController extends BaseController {
  constructor(
    public readonly issuesService: IssuesService,
    public readonly notificationsService: NotificationsService,
    @InjectModel('users') public readonly usersModel: Model<any>,
  ) {
    super(issuesService);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Issues,
  })
  async create(@Body() body: Issues, @UserInfo() user) {
    body.userId = user._id;
    const one = await this.issuesService.findOneId();
    body.id = one ? one.id + 1 : 1;

    const item = await this.issuesService.createFiles(body);
    const list = await this.usersModel
      .find({
        type: 2,
      })
      .select(['_id']);

    for (const itm of list) {
      await this.notificationsService.createFiles({
        body: 'New Issue',
        issueId: item._id,
        userId: itm._id,
      });
    }
    return item;
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: Issues,
  })
  async update(@Param('id') id: string, @Body() body: any) {
    return await this.issuesService.updateById(id, body);
  }
}
