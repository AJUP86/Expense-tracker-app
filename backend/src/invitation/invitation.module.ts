import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { Invitation } from '../database/entities/invitation.entity';
import { User } from '../database/entities/user.entity';
import { Budget } from '../database/entities/budget.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation, User, Budget])],
  providers: [InvitationService],
  controllers: [InvitationController],
})
export class InvitationModule {}

