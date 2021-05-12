import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Language } from 'src/languages/entities/language.entity';
import { EquipmentStage } from './equipment-stage.entity';

@Table({ timestamps: false, tableName: 'equipment_stage_translation' })
export class EquipmentStageTranslation extends Model {
  @ForeignKey(() => EquipmentStage)
  @Column({ primaryKey: true, unique: 'index', field: 'equipment_stage_id' })
  equipmentId: number;

  @ForeignKey(() => Language)
  @Column({ primaryKey: true, unique: 'index', field: 'language_code' })
  languageCode: string;

  @Column
  name: string;
}
