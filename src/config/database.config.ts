import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { Crop } from 'src/crops/entities/crop.entity';
import { CropTranslation } from 'src/crops/entities/crop-translation.entity';
import { Language } from 'src/languages/entities/language.entity';
import { ProductCrop } from 'src/product-crops/entities/product-crop.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductTranslation } from 'src/products/entities/product-translation.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { EquipmentTranslation } from 'src/equipment/entities/equipment-translation.entity';
import { EquipmentStage } from 'src/equipment-stage/entities/equipment-stage.entity';
import { EquipmentStageTranslation } from 'src/equipment-stage/entities/equipment-stage-translation.entity';
import { ProductCropEquipmentByStage } from 'src/product-crop-equipment-by-stage/entities/product-crop-equipment-by-stage.entity';

dotenv.config();

export const dbConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [
    Language,
    Crop,
    CropTranslation,
    Product,
    ProductTranslation,
    ProductCrop,
    Equipment,
    EquipmentTranslation,
    EquipmentStage,
    EquipmentStageTranslation,
    ProductCropEquipmentByStage,
  ],
};
