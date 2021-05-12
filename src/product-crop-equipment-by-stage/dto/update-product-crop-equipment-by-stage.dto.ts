import { PartialType } from '@nestjs/swagger';
import { CreateProductCropEquipmentByStageDto } from './create-product-crop-equipment-by-stage.dto';

export class UpdateProductCropEquipmentByStageDto extends PartialType(CreateProductCropEquipmentByStageDto) {}
