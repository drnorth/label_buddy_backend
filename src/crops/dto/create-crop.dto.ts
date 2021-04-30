import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDataURI,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { LanguageCodeCreateDto } from 'src/languages/dto/language-code.dto';

export class CreateCropDto {
  @ApiProperty()
  @IsDataURI()
  @IsOptional()
  imgUrl?: string;

  @ApiProperty({ type: () => [LanguageCodeCreateDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LanguageCodeCreateDto)
  translations?: LanguageCodeCreateDto[];
}
