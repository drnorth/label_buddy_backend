import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { Crop } from 'src/crops/entities/crop.entity';
import { Product } from 'src/products/entities/product.entity';

@Table({ timestamps: false, tableName: 'product_crop' })
export class ProductCrop extends Model {
  @ForeignKey(() => Product)
  @Column({ primaryKey: true, unique: 'product_crop', field: 'product_id' })
  productId: number;

  @BelongsTo(() => Product)
  products: Product;

  @ForeignKey(() => Crop)
  @Column({ primaryKey: true, unique: 'product_crop', field: 'crop_id' })
  cropId: number;

  @BelongsTo(() => Crop)
  crops: Crop;
}
