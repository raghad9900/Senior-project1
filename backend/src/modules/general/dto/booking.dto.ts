import {
  IsString,
  IsMongoId,
  IsOptional,
  IsObject,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LangDto } from 'src/common/base/baseDto.dto';

export class Booking {
  @IsString()
  @ApiProperty()
  startTime: string;

  @IsString()
  @ApiProperty()
  endTime: string;

  @IsString()
  @ApiProperty()
  status: string;

  
  @IsMongoId()
  @ApiProperty()
  labId: string;

  userId:string;


}
