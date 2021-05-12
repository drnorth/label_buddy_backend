import { Table, Model, Column, HasMany } from 'sequelize-typescript';
import { ProductCrop } from 'src/product-crops/entities/product-crop.entity';
import { CropTranslation } from './crop-translation.entity';

@Table({ timestamps: false, tableName: 'crop' })
export class Crop extends Model {
  @Column({ field: 'img_url' })
  imgUrl: string;

  @HasMany(() => CropTranslation)
  translations: CropTranslation[];

  @HasMany(() => ProductCrop)
  productCrop: ProductCrop[];
}
