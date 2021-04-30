import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { Crop } from 'src/crops/entities/crop.entity';
import { CropTranslation } from 'src/crops/entities/cropTranslation.entity';
import { Language } from 'src/languages/entities/language.entity';
dotenv.config();

export const dbConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [Language, Crop, CropTranslation],
};
