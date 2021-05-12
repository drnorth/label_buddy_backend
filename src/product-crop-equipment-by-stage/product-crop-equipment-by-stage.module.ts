import { Module } from '@nestjs/common';
import { ProductCropEquipmentByStageService } from './product-crop-equipment-by-stage.service';
import { ProductCropEquipmentByStageController } from './product-crop-equipment-by-stage.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductCropEquipmentByStage } from './entities/product-crop-equipment-by-stage.entity';

@Module({
  imports: [SequelizeModule.forFeature([ProductCropEquipmentByStage])],
  controllers: [ProductCropEquipmentByStageController],
  providers: [ProductCropEquipmentByStageService],
  exports: [SequelizeModule],
})
export class ProductCropEquipmentByStageModule {}
