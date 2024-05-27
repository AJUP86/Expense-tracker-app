import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBudgetCategoryTriggers1716841741785
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          -- Drop existing trigger and function if they exist
          DROP TRIGGER IF EXISTS update_budget_total_amount_trigger ON category CASCADE;
          DROP FUNCTION IF EXISTS update_budget_total_amount CASCADE;
    
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
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DROP TRIGGER IF EXISTS update_budget_total_amount_trigger ON category CASCADE;
          DROP FUNCTION IF EXISTS update_budget_total_amount CASCADE;
        `);
  }
}

