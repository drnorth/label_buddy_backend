import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EquipmentStageService } from './equipment-stage.service';
import { CreateEquipmentStageDto } from './dto/create-equipment-stage.dto';
import { UpdateEquipmentStageDto } from './dto/update-equipment-stage.dto';
import { LanguageCodeDto } from 'src/languages/dto/translations.dto';

@Controller('equipment-stage')
export class EquipmentStageController {
  constructor(private readonly equipmentStageService: EquipmentStageService) {}

  @Post()
  create(@Body() createEquipmentStageDto: CreateEquipmentStageDto) {
    return this.equipmentStageService.create(createEquipmentStageDto);
  }

  @Get()
  findAll(@Query() query: LanguageCodeDto) {
    return this.equipmentStageService.findAll(query.lang);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentStageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipmentStageDto: UpdateEquipmentStageDto,
  ) {
    return this.equipmentStageService.update(+id, updateEquipmentStageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentStageService.remove(+id);
  }
}
