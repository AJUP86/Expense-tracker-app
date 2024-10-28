import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { SharedBudgetService } from './shared-budget.service';
import { CreateSharedBudgetDto } from './dto/create-shared-budget.dto';
import { UpdateSharedBudgetDto } from './dto/update-shared-budget.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Shared-budget')
@Controller('shared-budget')
@UseGuards(RolesGuard, JwtAuthGuard)
export class SharedBudgetController {
  constructor(private readonly sharedBudgetService: SharedBudgetService) {}

  @Post()
  createSharedBudget(@Body() createSharedBudgetDto: CreateSharedBudgetDto) {
    return this.sharedBudgetService.createSharedBudget(createSharedBudgetDto);
  }

  @Get('user/:userId')
  getSharedBudgetsForUser(@Param('userId') userId: number) {
    return this.sharedBudgetService.findSharedBudgetsForUser(userId);
  }

  @Get(':id')
  getSharedBudgetById(@Param('id') id: number) {
    return this.sharedBudgetService.findOne(id);
  }

  @Put(':id')
  updateSharedBudget(
    @Param('id') id: number,
    @Body() updateSharedBudgetDto: UpdateSharedBudgetDto,
  ) {
    return this.sharedBudgetService.updateSharedBudget(
      id,
      updateSharedBudgetDto,
    );
  }
}
