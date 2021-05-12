import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { ProductTranslation } from './entities/product-translation.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { LanguagesModule } from 'src/languages/languages.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, ProductTranslation]),
    LanguagesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [SequelizeModule],
})
export class ProductsModule {}
