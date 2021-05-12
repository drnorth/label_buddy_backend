import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductCropsService } from './product-crops.service';
import { CreateProductCropDto } from './dto/create-product-crop.dto';
import { UpdateProductCropDto } from './dto/update-product-crop.dto';

@Controller('product-crops')
export class ProductCropsController {
  constructor(private readonly productCropsService: ProductCropsService) {}

  @Post()
  create(@Body() createProductCropDto: CreateProductCropDto) {
    return this.productCropsService.create(createProductCropDto);
  }

  @Get()
  findAll(@Param() param: UpdateProductCropDto) {
    return this.productCropsService.findAll(param);
  }

  @Delete()
  remove(@Param() param: CreateProductCropDto) {
    return this.productCropsService.remove(param);
  }
}
