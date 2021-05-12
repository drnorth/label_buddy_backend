import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductCropEquipmentByStageService } from './product-crop-equipment-by-stage.service';
import { CreateProductCropEquipmentByStageDto } from './dto/create-product-crop-equipment-by-stage.dto';
import { UpdateProductCropEquipmentByStageDto } from './dto/update-product-crop-equipment-by-stage.dto';

@Controller('product-crop-equipment-by-stage')
export class ProductCropEquipmentByStageController {
  constructor(
    private readonly productCropEquipmentByStageService: ProductCropEquipmentByStageService,
  ) {}
}
