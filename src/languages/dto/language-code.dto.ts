import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class LanguageCodeDto {
  @ApiProperty({ required: true })
  @IsNumberString()
  languageCode: number;
}

export class LanguageCodeCreateDto {
  @ApiProperty({ required: true })
  @IsNumber()
  languageCode: number;

  @ApiProperty({ required: true })
  @IsString()
  name: string;
}
