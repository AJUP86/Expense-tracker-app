import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/database/enums/roles.enum';
import { SharedBudgetService } from 'src/shared-budget/shared-budget.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private sharedBudgetService: SharedBudgetService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const budgetId = request.params.budgetId;

    const sharedBudget = await this.sharedBudgetService.findSharedBudget(
      user.user_id,
      budgetId,
    );

    if (!sharedBudget) {
      return false;
    }

    return requiredRoles.includes(sharedBudget.role);
  }
}
