import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { EquipmentStage } from 'src/equipment-stage/entities/equipment-stage.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { ProductCrop } from 'src/product-crops/entities/product-crop.entity';

@Table({ timestamps: false, tableName: 'product_crop_equipment_by_stage' })
export class ProductCropEquipmentByStage extends Model {
  @ForeignKey(() => ProductCrop)
  @Column({
    primaryKey: true,
    unique: 'product_crop',
    field: 'product_id',
    references: 'product_id',
  })
  productId: number;

  @ForeignKey(() => ProductCrop)
  @Column({
    primaryKey: true,
    unique: 'product_crop',
    field: 'crop_id',
    references: 'crop_id',
  })
  cropId: number;

  @ForeignKey(() => Equipment)
  @Column({
    primaryKey: true,
    field: 'equipment_id',
  })
  equipmentId: number;

  @BelongsTo(() => Equipment)
  equipment: Equipment;

  @ForeignKey(() => EquipmentStage)
  @Column({
    primaryKey: true,
    field: 'equipment_stage_id',
  })
  equipmentStageId: number;
}
