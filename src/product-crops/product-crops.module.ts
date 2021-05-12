import { Module } from '@nestjs/common';
import { ProductCropsService } from './product-crops.service';
import { ProductCropsController } from './product-crops.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductCrop } from './entities/product-crop.entity';
import { ProductsModule } from 'src/products/products.module';
import { CropsModule } from 'src/crops/crops.module';

@Module({
  imports: [SequelizeModule.forFeature([ProductCrop])],
  controllers: [ProductCropsController],
  providers: [ProductCropsService],
  exports: [SequelizeModule],
})
export class ProductCropsModule {}
