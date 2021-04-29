import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Language extends Model {
  @Column
  name: string;
}
