import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './config/database.config';
import { LanguagesModule } from './languages/languages.module';
import { CropsModule } from './crops/crops.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ProductCropsModule } from './product-crops/product-crops.module';
import { EquipmentModule } from './equipment/equipment.module';
import { EquipmentStageModule } from './equipment-stage/equipment-stage.module';
import { ProductCropEquipmentByStageModule } from './product-crop-equipment-by-stage/product-crop-equipment-by-stage.module';

@Module({
  imports: [
    SequelizeModule.forRoot(dbConfig),
    LanguagesModule,
    CropsModule,
    ProductsModule,
    UsersModule,
    ProductCropsModule,
    EquipmentModule,
    EquipmentStageModule,
    ProductCropEquipmentByStageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
