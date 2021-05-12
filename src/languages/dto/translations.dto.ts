import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LanguageCodeDto {
  @ApiProperty({ required: true })
  @IsString()
  lang: string;
}

export class TranslationCreateDto {
  @ApiProperty({ required: true })
  @IsString()
  lang: string;

  @ApiProperty({ required: true })
  @IsString()
  name: string;
}

export class DescTranslationCreateDto {
  @ApiProperty({ required: true })
  @IsString()
  lang: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  desc?: string;
}
