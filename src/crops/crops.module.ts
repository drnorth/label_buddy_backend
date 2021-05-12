import { Module } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CropsController } from './crops.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Crop } from './entities/crop.entity';
import { CropTranslation } from './entities/crop-translation.entity';
import { LanguagesModule } from 'src/languages/languages.module';
import { ProductCropsModule } from 'src/product-crops/product-crops.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Crop, CropTranslation]),
    LanguagesModule,
    ProductCropsModule,
  ],
  controllers: [CropsController],
  providers: [CropsService],
  exports: [SequelizeModule],
})
export class CropsModule {}
