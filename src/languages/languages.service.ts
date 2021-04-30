import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {
  constructor(@InjectModel(Language) private languageModel: typeof Language) {}
  async create(createLanguageDto: CreateLanguageDto) {
    const language = new this.languageModel(createLanguageDto);
    await language.save();
    return language;
  }

  async findAll() {
    return await this.languageModel.findAll();
  }

  async findOne(id: number) {
    const language = await this.languageModel.findOne({ where: { id } });
    if (language) {
      return language;
    }
    throw new HttpException(
      `Language with id '${id}' not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    const language = await this.findOne(id);
    return await language.update(updateLanguageDto);
  }

  async remove(id: number) {
    const language = await this.findOne(id);
    await language.destroy();
    return;
  }
}
