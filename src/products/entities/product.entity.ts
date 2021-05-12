import { Table, Model, Column, HasMany } from 'sequelize-typescript';
import { ProductTranslation } from './product-translation.entity';

@Table({ timestamps: false, tableName: 'product' })
export class Product extends Model {
  @Column({ field: 'img_url' })
  imgUrl: string;

  @HasMany(() => ProductTranslation)
  translations: ProductTranslation[];
}
