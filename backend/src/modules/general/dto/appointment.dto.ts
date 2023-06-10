import {
  IsString,
  IsMongoId,
  IsOptional,
  IsObject,
  IsNotEmpty,
  ValidateIf,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Appointment {
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  cancelid: Boolean;

  @IsString()
  @ApiProperty()
  start: String;

  @IsString()
  @ApiProperty()
  end: String;

  @IsMongoId()
  @ApiProperty()
  labId: String;

  userId: String;
}
