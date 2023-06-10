import {
  IsString,
  IsMongoId,
  IsOptional,
  IsObject,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class Issues {
  
  
  @IsString()
  @ApiProperty()
  body: string;

  @IsString()
  @ApiProperty()
  status: string;


  
  @IsMongoId()
  @ApiProperty()
  issueTypeId: string;

  userId:string;

  
  files: string[];


  
  
  @IsMongoId()
  @ApiProperty()
  labId: string;

  
  id:number;


}
