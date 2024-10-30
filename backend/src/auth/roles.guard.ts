import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from 'src/database/enums/roles.enum';
import { SharedBudgetService } from 'src/shared-budget/shared-budget.service';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);
  constructor(
    private reflector: Reflector,
    private sharedBudgetService: SharedBudgetService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const budgetId = request.params.id || request.params.budgetId;

    this.logger.debug(`User ID: ${user.userId}, Budget ID: ${budgetId}`);

    if (!budgetId) {
      this.logger.warn('No budget ID found in request parameters.');
      return true;
    }

    const sharedBudget = await this.sharedBudgetService.findSharedBudget(
      user.user_id,
      budgetId,
    );

    if (!sharedBudget) {
      this.logger.warn(
        `No SharedBudget entry found for User ID: ${user.userId}, Budget ID: ${budgetId}`,
      );
      return false;
    }
    this.logger.debug(
      `User Role: ${sharedBudget.role}, Required Roles: ${requiredRoles}`,
    );
    const hasRole = requiredRoles.includes(sharedBudget.role);
    return hasRole;
  }
}
