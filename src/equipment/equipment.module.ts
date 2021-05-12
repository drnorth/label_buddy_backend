import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Equipment } from './entities/equipment.entity';
import { EquipmentTranslation } from './entities/equipment-translation.entity';
import { EquipmentStageModule } from 'src/equipment-stage/equipment-stage.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Equipment, EquipmentTranslation]),
    EquipmentStageModule,
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [SequelizeModule],
})
export class EquipmentModule {}
