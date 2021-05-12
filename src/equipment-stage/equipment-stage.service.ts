import { Injectable } from '@nestjs/common';
import { CreateEquipmentStageDto } from './dto/create-equipment-stage.dto';
import { UpdateEquipmentStageDto } from './dto/update-equipment-stage.dto';

@Injectable()
export class EquipmentStageService {
  create(createEquipmentStageDto: CreateEquipmentStageDto) {
    return 'This action adds a new equipmentStage';
  }

  findAll(lang: string) {
    return `This action returns all equipmentStage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipmentStage`;
  }

  update(id: number, updateEquipmentStageDto: UpdateEquipmentStageDto) {
    return `This action updates a #${id} equipmentStage`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipmentStage`;
  }
}
