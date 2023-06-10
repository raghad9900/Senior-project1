import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsBoolean,
  IsString,
  MinLength,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class LangDto {
  @IsString()
  @ApiProperty()
  @Length(1, 2)
  @IsNotEmpty()
  ar: string;

  @IsString()
  @ApiProperty()
  @Length(1, 2)
  @IsNotEmpty()
  en: string;
}
