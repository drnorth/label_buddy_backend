import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class CreateProductCropDto {
  @ApiProperty()
  @IsNumberString()
  productId: number;

  @ApiProperty()
  @IsNumberString()
  cropId: number;
}
