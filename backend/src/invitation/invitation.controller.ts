import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from '../database/entities/invitation.entity';

@ApiTags('invitations')
@Controller('invitations')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  @ApiOperation({ summary: 'Create an invitation' })
  @ApiResponse({
    status: 201,
    description: 'The invitation has been successfully created.',
    type: Invitation,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(
    @Body() createInvitationDto: CreateInvitationDto,
  ): Promise<Invitation> {
    return this.invitationService.create(createInvitationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invitations' })
  @ApiResponse({
    status: 200,
    description: 'Return all invitations.',
    type: [Invitation],
  })
  findAll(): Promise<Invitation[]> {
    return this.invitationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an invitation by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the invitation.',
    type: Invitation,
  })
  @ApiResponse({ status: 404, description: 'Invitation not found' })
  findOne(@Param('id') id: number): Promise<Invitation> {
    return this.invitationService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an invitation' })
  @ApiResponse({
    status: 200,
    description: 'The invitation has been successfully updated.',
    type: Invitation,
  })
  @ApiResponse({ status: 404, description: 'Invitation not found' })
  update(
    @Param('id') id: number,
    @Body() updateInvitationDto: UpdateInvitationDto,
  ): Promise<Invitation> {
    return this.invitationService.update(id, updateInvitationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an invitation' })
  @ApiResponse({
    status: 200,
    description: 'The invitation has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Invitation not found' })
  remove(@Param('id') id: number): Promise<void> {
    return this.invitationService.remove(id);
  }
}
