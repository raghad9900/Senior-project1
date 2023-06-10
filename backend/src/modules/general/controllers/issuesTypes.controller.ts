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
import { IssuesTypes } from '../dto/issuesTypes.dto';
import { IssuesTypesService } from '../services/issuesTypes.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BaseController } from 'src/common/base/baseController.controller';


@ApiTags('IssuesTypes')
@Controller('issuesTypes')
@UseGuards(AuthGuard('jwt'))
export class IssuesTypesController extends BaseController {
  constructor(public readonly issuesTypesService: IssuesTypesService) {
    super(issuesTypesService);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: IssuesTypes,
  })
  async create(@Body() body: IssuesTypes) {
    return await this.issuesTypesService.createFiles(body);
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: IssuesTypes,
  })
  async update(@Param('id') id: string, @Body() body: IssuesTypes) {
    return await this.issuesTypesService.updateById(id, body);
  }
}
