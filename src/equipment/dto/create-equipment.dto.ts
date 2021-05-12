import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested, IsArray } from 'class-validator';
import { TranslationCreateDto } from 'src/languages/dto/translations.dto';

export class CreateEquipmentDto {
  @ApiProperty({ type: () => [TranslationCreateDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TranslationCreateDto)
  translations?: TranslationCreateDto[];
}
