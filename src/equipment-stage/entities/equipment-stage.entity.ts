import { HasMany, Model, Table } from 'sequelize-typescript';
import { ProductCropEquipmentByStage } from 'src/product-crop-equipment-by-stage/entities/product-crop-equipment-by-stage.entity';
import { EquipmentStageTranslation } from './equipment-stage-translation.entity';

@Table({ timestamps: false, tableName: 'equipment_stage' })
export class EquipmentStage extends Model {
  @HasMany(() => EquipmentStageTranslation)
  translations: EquipmentStageTranslation[];

  @HasMany(() => ProductCropEquipmentByStage)
  equipByStage: ProductCropEquipmentByStage[];
}
