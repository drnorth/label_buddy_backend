import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { LanguagesService } from 'src/languages/languages.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Crop } from './entities/crop.entity';
import { CropTranslation } from './entities/cropTranslation.entity';

@Injectable()
export class CropsService {
  constructor(
    @InjectModel(Crop) private cropModel: typeof Crop,
    @InjectModel(CropTranslation)
    private cropTranslationModel: typeof CropTranslation,
    private readonly LanguagesService: LanguagesService,
  ) {}

  async create(createCropDto: CreateCropDto) {
    const { translations: translationsDto, ...cropData } = createCropDto;
    const crop = new this.cropModel(cropData);
    await crop.save();
    if (translationsDto) {
      const translations = await Promise.all(
        translationsDto.map(async (el) => {
          const { languageCode, name } = el;

          try {
            await this.LanguagesService.findOne(languageCode);
            return await this.addCropTranslation(crop.id, languageCode, name);
          } catch (error) {
            return {
              languageCode,
              error: { status: error.status, message: error.message },
            };
          }
        }),
      );
      return { crop, translations };
    }
    return { crop };
  }

  async findAll(languageCode: number) {
    const crops = await this.cropModel.findAll({
      attributes: [
        'id',
        'img_url',
        [sequelize.fn('max', sequelize.col('translations.name')), 'name'],
      ],
      include: [
        {
          model: this.cropTranslationModel,
          where: { languageCode },
          required: false,
          attributes: [],
        },
      ],
      group: ['Crop.id', 'Crop.img_url'],
    });

    return crops;
  }

  async findOne(languageCode: number, id: number) {
    const crop = await this.cropModel.findOne({
      where: { id },
      attributes: [
        'id',
        'img_url',
        [sequelize.fn('max', sequelize.col('translations.name')), 'name'],
      ],
      include: {
        model: this.cropTranslationModel,
        where: { languageCode },
        required: false,
        attributes: [],
      },
      group: ['Crop.id', 'Crop.img_url'],
    });
    if (crop) {
      return crop;
    }
    throw new HttpException(
      `Crop with id '${id}' not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateCropDto: UpdateCropDto) {
    const crop = await this.findOne(0, id);
    const { translations: translationsDto, ...cropData } = updateCropDto;
    await crop.update(cropData);
    if (translationsDto) {
      const translations = await Promise.all(
        translationsDto.map(async (el) => {
          const { languageCode, name } = el;
          try {
            await this.LanguagesService.findOne(languageCode);
            return await this.updateCropTranslation(
              crop.id,
              languageCode,
              name,
            );
          } catch (error) {
            return {
              languageCode,
              error: { code: error.code, message: error.message },
            };
          }
        }),
      );
      return { crop, translations };
    }
    return { crop };
  }

  remove(id: number) {
    return `This action removes a #${id} crop`;
  }

  async addCropTranslation(cropId: number, languageCode: number, name: string) {
    const newCropTranslation = new this.cropTranslationModel({
      cropId,
      languageCode,
      name,
    });
    return await newCropTranslation.save();
  }

  async updateCropTranslation(
    cropId: number,
    languageCode: number,
    name: string,
  ) {
    const cropTranslation = await this.cropTranslationModel.findOne({
      where: { cropId, languageCode },
    });
    if (cropTranslation) {
      return await cropTranslation.update({ name });
    }
    const newCropTranslation = new this.cropTranslationModel({
      cropId,
      languageCode,
      name,
    });
    return await newCropTranslation.save();
  }
}
