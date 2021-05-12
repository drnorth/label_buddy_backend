import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({ required: true })
  @IsString()
  code: string;

  @ApiProperty()
  @Optional()
  @IsString()
  title: string;
}
