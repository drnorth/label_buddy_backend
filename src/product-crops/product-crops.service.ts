import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Crop } from 'src/crops/entities/crop.entity';
import { Product } from 'src/products/entities/product.entity';
import { CreateProductCropDto } from './dto/create-product-crop.dto';
import { UpdateProductCropDto } from './dto/update-product-crop.dto';
import { ProductCrop } from './entities/product-crop.entity';

@Injectable()
export class ProductCropsService {
  constructor(
    @InjectModel(ProductCrop) private productCropModel: typeof ProductCrop,
  ) {}

  create(createProductCropDto: CreateProductCropDto) {
    return 'This action adds a new productCrop';
  }

  findAll(param: UpdateProductCropDto) {
    return `This action returns all productCrops`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productCrop`;
  }

  update(id: number, updateProductCropDto: UpdateProductCropDto) {
    return `This action updates a #${id} productCrop`;
  }

  remove(param: CreateProductCropDto) {
    return `This action removes a #${param} productCrop`;
  }
}
