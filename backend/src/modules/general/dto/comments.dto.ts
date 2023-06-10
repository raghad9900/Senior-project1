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

export class Comments {
 
  @IsString()
  @ApiProperty()
  body: string;

  @IsString()
  @ApiProperty()
  status: string;


  
  @IsMongoId()
  @ApiProperty()
  issueId: string;

  userId:string;

}
