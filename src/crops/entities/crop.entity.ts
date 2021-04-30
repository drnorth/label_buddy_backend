import { Table, Model, Column, HasMany } from 'sequelize-typescript';
import { CropTranslation } from './cropTranslation.entity';

@Table({ timestamps: false, tableName: 'crop' })
export class Crop extends Model {
  @Column({ field: 'img_url' })
  imgUrl: string;

  @HasMany(() => CropTranslation)
  translations: CropTranslation[];
}
