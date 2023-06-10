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
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BaseController } from 'src/common/base/baseController.controller';
import { UserInfo } from 'src/common/decorator/user.decorator';

@ApiTags('Appointment')
@Controller('appointment')
@UseGuards(AuthGuard('jwt'))
export class AppointmentController extends BaseController {
  constructor(public readonly appointmentService: AppointmentService) {
    super(appointmentService);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Appointment,
  })
  async create(@Body() body: Appointment, @UserInfo() user) {
    body.userId = user._id;
    return await this.appointmentService.createFiles(body);
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: Appointment,
  })
  async update(@Param('id') id: string, @Body() body: any) {
    return await this.appointmentService.updateById(id, body);
  }
}
