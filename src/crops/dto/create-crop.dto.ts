import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDataURI,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { TranslationCreateDto } from 'src/languages/dto/translations.dto';

export class CreateCropDto {
  @ApiProperty()
  @IsDataURI()
  @IsOptional()
  imgUrl?: string;

  @ApiProperty({ type: () => [TranslationCreateDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TranslationCreateDto)
  translations?: TranslationCreateDto[];
}
