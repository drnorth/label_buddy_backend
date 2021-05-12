import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetCropsDto {
  @ApiProperty({ required: true })
  @IsString()
  lang: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  product?: number;
}
