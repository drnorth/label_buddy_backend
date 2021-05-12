import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { EquipmentTranslation } from './equipment-translation.entity';

@Table({ timestamps: false, tableName: 'equipment' })
export class Equipment extends Model {
  @Column({ field: 'img_url' })
  imgUrl: string;

  @HasMany(() => EquipmentTranslation)
  translations: EquipmentTranslation[];
}
