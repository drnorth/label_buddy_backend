import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Language } from 'src/languages/entities/language.entity';
import { Equipment } from './equipment.entity';

@Table({ timestamps: false, tableName: 'equipment_translation' })
export class EquipmentTranslation extends Model {
  @ForeignKey(() => Equipment)
  @Column({ primaryKey: true, unique: 'index', field: 'equipment_id' })
  equipmentId: number;

  @ForeignKey(() => Language)
  @Column({ primaryKey: true, unique: 'index', field: 'language_code' })
  languageCode: string;

  @Column
  name: string;
}
