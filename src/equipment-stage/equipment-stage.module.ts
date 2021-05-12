import { Module } from '@nestjs/common';
import { EquipmentStageService } from './equipment-stage.service';
import { EquipmentStageController } from './equipment-stage.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EquipmentStage } from './entities/equipment-stage.entity';
import { EquipmentStageTranslation } from './entities/equipment-stage-translation.entity';
import { ProductCropEquipmentByStageModule } from 'src/product-crop-equipment-by-stage/product-crop-equipment-by-stage.module';

@Module({
  imports: [
    SequelizeModule.forFeature([EquipmentStage, EquipmentStageTranslation]),
    ProductCropEquipmentByStageModule,
  ],
  controllers: [EquipmentStageController],
  providers: [EquipmentStageService],
  exports: [SequelizeModule],
})
export class EquipmentStageModule {}
