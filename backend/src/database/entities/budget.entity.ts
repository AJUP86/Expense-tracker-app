// src/database/entities/budget.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Invitation } from './invitation.entity';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  budget_id: number;

  @Column()
  name: string;

  @Column('decimal')
  total_amount: number;

  @Column('decimal')
  remaining_amount: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @ManyToOne(() => User, (user) => user.budgets)
  user: User;

  @OneToMany(() => Category, (category) => category.budget)
  categories: Category[];

  @OneToMany(() => Invitation, (invitation) => invitation.budget)
  invitations: Invitation[];
}
