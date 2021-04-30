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
import { ApiTags } from '@nestjs/swagger';
import { LanguageCodeDto } from 'src/languages/dto/language-code.dto';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@ApiTags('Crops')
@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Get()
  findAll(@Query() query: LanguageCodeDto) {
    return this.cropsService.findAll(query.languageCode);
  }

  @Post()
  create(@Body() createCropDto: CreateCropDto) {
    return this.cropsService.create(createCropDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: LanguageCodeDto) {
    return this.cropsService.findOne(query.languageCode, +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto) {
    return this.cropsService.update(+id, updateCropDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropsService.remove(+id);
  }
}
