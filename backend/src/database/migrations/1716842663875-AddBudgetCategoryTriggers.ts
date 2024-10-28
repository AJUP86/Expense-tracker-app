import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBudgetCategoryTriggers1716842663875
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          -- Drop existing triggers and functions if they exist
          DROP TRIGGER IF EXISTS update_budget_total_amount_trigger ON category CASCADE;
          DROP FUNCTION IF EXISTS update_budget_total_amount CASCADE;
          DROP TRIGGER IF EXISTS update_category_remaining_amount_trigger ON expense CASCADE;
          DROP FUNCTION IF EXISTS update_category_remaining_amount CASCADE;
          DROP TRIGGER IF EXISTS update_budget_remaining_amount_trigger ON expense CASCADE;
          DROP FUNCTION IF EXISTS update_budget_remaining_amount CASCADE;
    
          -- Function to update total amount in Budget when a Category is created or updated
          CREATE OR REPLACE FUNCTION update_budget_total_amount() 
          RETURNS TRIGGER AS $$
          BEGIN
            UPDATE budget
            SET total_amount = (
              SELECT COALESCE(SUM(allocated_amount), 0)
              FROM category
              WHERE category.budget_id = NEW.budget_id
            )
            WHERE budget.budget_id = NEW.budget_id;
            RETURN NEW;
          END;
          $$ LANGUAGE plpgsql;
    
          -- Trigger to update budget total amount when a Category is inserted or updated
          CREATE TRIGGER update_budget_total_amount_trigger
          AFTER INSERT OR UPDATE ON category
          FOR EACH ROW
          EXECUTE FUNCTION update_budget_total_amount();
    
          -- Function to update remaining amount in Category when an Expense is created or updated
          CREATE OR REPLACE FUNCTION update_category_remaining_amount()
          RETURNS TRIGGER AS $$
          BEGIN
            UPDATE category
            SET remaining_amount = allocated_amount - (
              SELECT COALESCE(SUM(amount), 0)
              FROM expense
              WHERE expense.category_id = NEW.category_id
            )
            WHERE category.category_id = NEW.category_id;
            RETURN NEW;
          END;
          $$ LANGUAGE plpgsql;
    
          -- Trigger to update category remaining amount when an Expense is inserted or updated
          CREATE TRIGGER update_category_remaining_amount_trigger
          AFTER INSERT OR UPDATE ON expense
          FOR EACH ROW
          EXECUTE FUNCTION update_category_remaining_amount();
    
          -- Function to update remaining amount in Budget when an Expense is created or updated
          CREATE OR REPLACE FUNCTION update_budget_remaining_amount()
          RETURNS TRIGGER AS $$
          BEGIN
            UPDATE budget
            SET remaining_amount = (
              SELECT total_amount - COALESCE(SUM(amount), 0)
              FROM expense
              WHERE expense.budget_id = NEW.budget_id
            )
            WHERE budget.budget_id = NEW.budget_id;
            RETURN NEW;
          END;
          $$ LANGUAGE plpgsql;
    
          -- Trigger to update budget remaining amount when an Expense is inserted or updated
          CREATE TRIGGER update_budget_remaining_amount_trigger
          AFTER INSERT OR UPDATE ON expense
          FOR EACH ROW
          EXECUTE FUNCTION update_budget_remaining_amount();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DROP TRIGGER IF EXISTS update_budget_total_amount_trigger ON category CASCADE;
          DROP FUNCTION IF EXISTS update_budget_total_amount CASCADE;
          DROP TRIGGER IF EXISTS update_category_remaining_amount_trigger ON expense CASCADE;
          DROP FUNCTION IF EXISTS update_category_remaining_amount CASCADE;
          DROP TRIGGER IF EXISTS update_budget_remaining_amount_trigger ON expense CASCADE;
          DROP FUNCTION IF EXISTS update_budget_remaining_amount CASCADE;
        `);
  }
}

