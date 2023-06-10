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
import { Booking } from '../dto/booking.dto';
import { BookingService } from '../services/booking.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BaseController } from 'src/common/base/baseController.controller';


@ApiTags('Booking')
@Controller('booking')
@UseGuards(AuthGuard('jwt'))
export class BookingController extends BaseController {
  constructor(public readonly bookingService: BookingService) {
    super(bookingService);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Booking,
  })
  async create(@Body() body: Booking) {
    return await this.bookingService.createFiles(body);
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: Booking,
  })
  async update(@Param('id') id: string, @Body() body: Booking) {
    return await this.bookingService.updateById(id, body);
  }

  
}
