import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { Language } from 'src/languages/entities/language.entity';
import { Crop } from './crop.entity';

@Table({ timestamps: false, tableName: 'crop_translation' })
export class CropTranslation extends Model {
  @ForeignKey(() => Crop)
  @Column({ primaryKey: true, unique: 'index', field: 'crop_id' })
  cropId: number;

  @ForeignKey(() => Language)
  @Column({ primaryKey: true, unique: 'index', field: 'language_code' })
  languageCode: string;

  @Column
  name: string;
}
