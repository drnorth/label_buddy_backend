import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  async findAll() {
    return await this.languagesService.findAll();
  }

  @Post()
  async create(@Body() createLanguageDto: CreateLanguageDto) {
    return await this.languagesService.create(createLanguageDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.languagesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return await this.languagesService.update(+id, updateLanguageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.languagesService.remove(+id);
  }
}
