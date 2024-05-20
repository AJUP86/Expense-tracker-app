// src/database/entities/invitation.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Budget } from './budget.entity';

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn()
  invitation_id: number;

  @ManyToOne(() => User, (user) => user.sentInvitations)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedInvitations)
  receiver: User;

  @ManyToOne(() => Budget, (budget) => budget.invitations)
  budget: Budget;

  @Column()
  status: string;
}
