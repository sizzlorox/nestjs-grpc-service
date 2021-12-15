import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum EVENT_TYPE {
  INSERT = 1,
  UPDATE = 2,
  DELETE = 3,
}

@Entity()
export class Hello {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public name: string;
}
