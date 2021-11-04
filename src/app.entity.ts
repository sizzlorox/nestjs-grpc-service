import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hello {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public name: string;
}
