import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { EquipmentStageTranslation } from 'src/equipment-stage/entities/equipment-stage-translation.entity';
import { EquipmentStage } from 'src/equipment-stage/entities/equipment-stage.entity';
import { ProductCropEquipmentByStage } from 'src/product-crop-equipment-by-stage/entities/product-crop-equipment-by-stage.entity';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { EquipmentTranslation } from './entities/equipment-translation.entity';
import { Equipment } from './entities/equipment.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment) private equipmentModel: typeof Equipment,
    @InjectModel(EquipmentTranslation)
    private equipmentTranslationModel: typeof EquipmentTranslation,
    @InjectModel(EquipmentStage)
    private equipmentStageModel: typeof EquipmentStage,
  ) {}

  create(createEquipmentDto: CreateEquipmentDto) {
    return 'This action adds a new equipment';
  }

  async findAll(lang: string, crop: number, product: number) {
    if (crop || product) {
      if (crop && product) {
        return await this.findByStages(lang, crop, product);
      }
      throw new HttpException(
        `Query must be include both: 'crop' and 'product'`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const equipment = await this.equipmentModel.findAll({
      attributes: [
        'id',
        [sequelize.fn('max', sequelize.col('translations.name')), 'name'],
      ],
      group: ['id'],
      include: [
        {
          model: this.equipmentTranslationModel,
          attributes: [],
          where: {
            languageCode: lang,
          },
        },
      ],
    });
    return equipment;
  }

  async findByStages(lang: string, crop: number, product: number) {
    const equipmentByStage = await this.equipmentStageModel.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: EquipmentStageTranslation,
          where: {
            languageCode: lang,
          },
        },
        {
          model: ProductCropEquipmentByStage,
          order: ['equipment_id', 'ASC'],
          where: {
            productId: product,
            cropId: crop,
          },
          required: true,
          include: [
            {
              model: this.equipmentModel,
              include: [
                {
                  model: this.equipmentTranslationModel,
                  where: {
                    languageCode: lang,
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    return equipmentByStage.map((equipStage) => {
      return {
        id: equipStage.id,
        stage: equipStage.translations.length
          ? equipStage.translations[0].name
          : '',
        data: equipStage.equipByStage.map((eqByStage) => {
          return {
            id: eqByStage.equipmentId,
            title: eqByStage.equipment.translations.length
              ? eqByStage.equipment.translations[0].name
              : '',
            url: eqByStage.equipment.imgUrl,
          };
        }),
      };
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} equipment`;
  }

  update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return `This action updates a #${id} equipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipment`;
  }
}
