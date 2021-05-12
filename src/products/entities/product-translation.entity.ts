import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { Language } from 'src/languages/entities/language.entity';
import { Product } from './product.entity';

@Table({ timestamps: false, tableName: 'product_translation' })
export class ProductTranslation extends Model {
  @ForeignKey(() => Product)
  @Column({ primaryKey: true, unique: 'index', field: 'product_id' })
  productId: number;

  @ForeignKey(() => Language)
  @Column({ primaryKey: true, unique: 'index', field: 'language_code' })
  languageCode: string;

  @Column
  name: string;

  @Column
  desc: string;
}
