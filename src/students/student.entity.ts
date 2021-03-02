import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Rating {
  poor = 'poor',
  pair = 'pair',
  good = 'good',
  excellent = 'excellent',
}

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  patronymic: string;

  @Column({
    type: 'enum',
    enum: Rating,
    nullable: false,
  })
  rating: Rating;

  @Column({
    type: 'date',
    nullable: false,
  })
  birthday: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
