import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'language',
})
export class Language extends Model {
  @Column
  name: string;
}
