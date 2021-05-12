import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { TranslationCreateDto } from 'src/languages/dto/translations.dto';
import { LanguagesService } from 'src/languages/languages.service';
import { ProductCrop } from 'src/product-crops/entities/product-crop.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Crop } from './entities/crop.entity';
import { CropTranslation } from './entities/crop-translation.entity';

@Injectable()
export class CropsService {
  constructor(
    @InjectModel(Crop) private cropModel: typeof Crop,
    @InjectModel(CropTranslation)
    private cropTranslationModel: typeof CropTranslation,
    @InjectModel(ProductCrop) private productCropModel: typeof ProductCrop,
    private readonly LanguagesService: LanguagesService,
  ) {}

  async create(createCropDto: CreateCropDto) {
    const { translations: translationsDto, ...cropData } = createCropDto;
    const crop = new this.cropModel(cropData);
    await crop.save();
    if (translationsDto) {
      const languages = await this.LanguagesService.findAll();
      const translations = await Promise.all(
        translationsDto.map(async (translation) => {
          const { lang } = translation;
          try {
            if (!languages.find((language) => language.code === lang))
              throw new HttpException(
                `Language with code '${lang}' not found`,
                HttpStatus.NOT_FOUND,
              );
            return await this.addCropTranslation(crop.id, translation);
          } catch (error) {
            return {
              lang,
              error: { status: error.status, message: error.message },
            };
          }
        }),
      );
      return { crop, translations };
    }
    return { crop };
  }

  async findAll(languageCode: string, productId: number) {
    const productCondition = productId
      ? { where: { productId }, required: true }
      : {};

    const crops = await this.cropModel.findAll({
      attributes: [
        'id',
        ['img_url', 'url'],
        [
          sequelize.fn(
            'max',
            sequelize.fn('COALESCE', sequelize.col('translations.name'), ''),
          ),
          'title',
        ],
      ],
      include: [
        {
          model: this.cropTranslationModel,
          where: { languageCode },
          required: false,
          attributes: [],
        },
        {
          model: this.productCropModel,
          attributes: [],
          ...productCondition,
        },
      ],
      group: ['Crop.id', 'Crop.img_url'],
      order: [['id', 'ASC']],
    });

    return crops;
  }

  async findOne(languageCode: string, id: number) {
    const crop = await this.cropModel.findOne({
      where: { id },
      attributes: [
        'id',
        ['img_url', 'url'],
        [
          sequelize.fn(
            'max',
            sequelize.fn('COALESCE', sequelize.col('translations.name'), ''),
          ),
          'name',
        ],
      ],
      include: {
        model: this.cropTranslationModel,
        where: { languageCode },
        required: false,
        attributes: [],
      },
      group: ['id', 'img_url'],
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
    const crop = await this.findOne('', id);
    const { translations: translationsDto, ...cropData } = updateCropDto;
    await crop.update(cropData);
    if (translationsDto) {
      const languages = await this.LanguagesService.findAll();
      const translations = await Promise.all(
        translationsDto.map(async (translation) => {
          const { lang } = translation;
          try {
            if (!languages.find((language) => language.code === lang))
              throw new HttpException(
                `Language with code '${lang}' not found`,
                HttpStatus.NOT_FOUND,
              );
            return await this.updateCropTranslation(crop.id, translation);
          } catch (error) {
            return {
              lang,
              error: { code: error.code, message: error.message },
            };
          }
        }),
      );
      return { crop, translations };
    }
    return { crop };
  }

  async remove(id: number) {
    const crop = await this.findOne('', id);
    crop.destroy();
    return;
  }

  async addCropTranslation(cropId: number, translation: TranslationCreateDto) {
    const cropTranslation = new this.cropTranslationModel({
      cropId,
      ...translation,
    });
    return await cropTranslation.save();
  }

  async updateCropTranslation(
    cropId: number,
    translation: TranslationCreateDto,
  ) {
    const { lang, ...data } = translation;
    const cropTranslation = await this.cropTranslationModel.findOne({
      where: { cropId, languageCode: lang },
    });
    if (cropTranslation) {
      return await cropTranslation.update(data);
    }
    return await this.addCropTranslation(cropId, translation);
  }
}
