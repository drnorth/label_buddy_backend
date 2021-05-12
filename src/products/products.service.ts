import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { LanguagesService } from 'src/languages/languages.service';
import { Product } from './entities/product.entity';
import { ProductTranslation } from './entities/product-translation.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DescTranslationCreateDto } from 'src/languages/dto/translations.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(ProductTranslation)
    private productTranslationModel: typeof ProductTranslation,
    private readonly LanguagesService: LanguagesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { translations: translationsDto, ...productData } = createProductDto;
    const product = new this.productModel(productData);
    await product.save();
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
            return await this.addProductTranslation(product.id, translation);
          } catch (error) {
            return {
              lang,
              error: { status: error.status, message: error.message },
            };
          }
        }),
      );
      return { product, translations };
    }
    return { product };
  }

  async findAll(languageCode: string) {
    const products = await this.productModel.findAll({
      attributes: [
        'id',
        ['img_url', 'url'],
        [sequelize.fn('max', sequelize.col('translations.name')), 'title'],
        [sequelize.fn('max', sequelize.col('translations.desc')), 'desc'],
      ],
      include: [
        {
          model: this.productTranslationModel,
          where: { languageCode },
          required: false,
          attributes: [],
        },
      ],
      group: ['Product.id', 'Product.img_url'],
    });

    return products;
  }

  async findOne(languageCode: string, id: number) {
    const product = await this.productModel.findOne({
      where: { id },
      attributes: [
        'id',
        'img_url',
        [sequelize.fn('max', sequelize.col('translations.name')), 'name'],
      ],
      include: {
        model: this.productTranslationModel,
        where: { languageCode },
        required: false,
        attributes: [],
      },
      group: ['Product.id', 'Product.img_url'],
    });
    if (product) {
      return product;
    }
    throw new HttpException(
      `Product with id '${id}' not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateCropDto: UpdateProductDto) {
    const product = await this.findOne('', id);
    const { translations: translationsDto, ...productData } = updateCropDto;
    await product.update(productData);
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
            return await this.updateProductTranslation(product.id, translation);
          } catch (error) {
            return {
              lang,
              error: { code: error.code, message: error.message },
            };
          }
        }),
      );
      return { product, translations };
    }
    return { product };
  }

  async remove(id: number) {
    const product = await this.findOne('', id);
    product.destroy();
    return;
  }

  async addProductTranslation(
    productId: number,
    translation: DescTranslationCreateDto,
  ) {
    const productTranslation = new this.productTranslationModel({
      productId,
      ...translation,
    });
    return await productTranslation.save();
  }

  async updateProductTranslation(
    productId: number,
    translation: DescTranslationCreateDto,
  ) {
    const { lang, ...data } = translation;
    const cropTranslation = await this.productTranslationModel.findOne({
      where: { productId, languageCode: lang },
    });
    if (cropTranslation) {
      return await cropTranslation.update(data);
    }
    return await this.addProductTranslation(productId, translation);
  }
}
