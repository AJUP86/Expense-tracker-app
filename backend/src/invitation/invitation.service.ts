import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from '../database/entities/invitation.entity';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { User } from '../database/entities/user.entity';
import { Budget } from '../database/entities/budget.entity';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
  ) {}

  async create(createInvitationDto: CreateInvitationDto): Promise<Invitation> {
    const sender = await this.userRepository.findOne({
      where: { user_id: createInvitationDto.senderId },
    });
    const receiver = await this.userRepository.findOne({
      where: { user_id: createInvitationDto.receiverId },
    });
    const budget = await this.budgetRepository.findOne({
      where: { budget_id: createInvitationDto.budgetId },
    });

    if (!sender || !receiver || !budget) {
      throw new NotFoundException('User or Budget not found');
    }

    const invitation = this.invitationRepository.create({
      sender,
      receiver,
      budget,
      status: createInvitationDto.status,
    });

    return this.invitationRepository.save(invitation);
  }

  findAll(): Promise<Invitation[]> {
    return this.invitationRepository.find({
      relations: ['sender', 'receiver', 'budget'],
    });
  }

  async findOne(id: number): Promise<Invitation> {
    const invitation = await this.invitationRepository.findOne({
      where: { invitation_id: id },
      relations: ['sender', 'receiver', 'budget'],
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }
    return invitation;
  }

  async update(
    id: number,
    updateInvitationDto: UpdateInvitationDto,
  ): Promise<Invitation> {
    const invitation = await this.invitationRepository.preload({
      invitation_id: id,
      ...updateInvitationDto,
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }
    return this.invitationRepository.save(invitation);
  }

  async remove(id: number): Promise<void> {
    const invitation = await this.findOne(id);
    await this.invitationRepository.remove(invitation);
  }
}
