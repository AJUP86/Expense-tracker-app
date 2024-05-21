// src/budget/dto/create-budget.dto.ts
export class CreateBudgetDto {
  readonly name: string;
  readonly total_amount: number;
  readonly start_date: Date;
  readonly end_date: Date;
  readonly userId: number;
}
