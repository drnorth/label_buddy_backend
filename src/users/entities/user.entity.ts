import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Language } from 'src/languages/entities/language.entity';

@Table({
  tableName: 'user',
})
export class User extends Model {
  @Column
  name: string;

  @Column({ field: 'phone_number' })
  phoneNumber: string;

  @ForeignKey(() => Language)
  @Column({ field: 'language_code' })
  languageCode: string;
}
