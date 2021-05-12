import { PartialType } from '@nestjs/swagger';
import { CreateProductCropDto } from './create-product-crop.dto';

export class UpdateProductCropDto extends PartialType(CreateProductCropDto) {}
