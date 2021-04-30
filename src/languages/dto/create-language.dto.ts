import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;
}
