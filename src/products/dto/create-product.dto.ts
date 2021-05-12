import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDataURI,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { DescTranslationCreateDto } from 'src/languages/dto/translations.dto';

export class CreateProductDto {
  @ApiProperty()
  @IsDataURI()
  @IsOptional()
  imgUrl?: string;

  @ApiProperty({ type: () => [DescTranslationCreateDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DescTranslationCreateDto)
  translations?: DescTranslationCreateDto[];
}
