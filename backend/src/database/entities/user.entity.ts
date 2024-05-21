// src/database/entities/user.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Budget } from './budget.entity';
import { Invitation } from './invitation.entity';

@Entity()
@Index(['username'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  oauth_provider: string;

  @Column()
  oauth_id: string;

  @OneToMany(() => Budget, (budget) => budget.user)
  budgets: Budget[];

  @OneToMany(() => Budget, (budget) => budget.owner)
  ownedBudgets: Budget[];

  @OneToMany(() => Invitation, (invitation) => invitation.sender)
  sentInvitations: Invitation[];

  @OneToMany(() => Invitation, (invitation) => invitation.receiver)
  receivedInvitations: Invitation[];
}
