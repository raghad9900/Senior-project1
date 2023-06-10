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
import { Labs } from '../dto/labs.dto';
import { LabsService } from '../services/labs.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BaseController } from 'src/common/base/baseController.controller';


@ApiTags('Labs')
@Controller('labs')
@UseGuards(AuthGuard('jwt'))
export class LabsController extends BaseController {
  constructor(public readonly labsService: LabsService) {
    super(labsService);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Labs,
  })
  async create(@Body() body: Labs) {
    return await this.labsService.createFiles(body);
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: Labs,
  })
  async update(@Param('id') id: string, @Body() body: Labs) {
    return await this.labsService.updateById(id, body);
  }
}
