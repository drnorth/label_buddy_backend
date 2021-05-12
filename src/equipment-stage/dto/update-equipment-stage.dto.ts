import { PartialType } from '@nestjs/swagger';
import { CreateEquipmentStageDto } from './create-equipment-stage.dto';

export class UpdateEquipmentStageDto extends PartialType(
  CreateEquipmentStageDto,
) {}
