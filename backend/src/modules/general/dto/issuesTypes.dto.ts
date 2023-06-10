import {
  IsString,
  IsMongoId,
  IsOptional,
  IsObject,
  IsNotEmpty,
  ValidateIf,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LangDto } from 'src/common/base/baseDto.dto';

export class IssuesTypes {
  @IsString()
  @ApiProperty()
  name: String;
}
