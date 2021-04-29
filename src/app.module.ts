import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './config/database.config';
import { LanguagesModule } from './languages/languages.module';

@Module({
  imports: [SequelizeModule.forRoot(dbConfig), LanguagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
