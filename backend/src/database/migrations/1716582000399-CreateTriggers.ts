import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTriggers1716582000399 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_budget_total_amount() RETURNS TRIGGER AS $$
            BEGIN
                -- Calculate the total amount
                UPDATE budget
                SET total_amount = (
                    SELECT COALESCE(SUM(allocated_amount), 0)
                    FROM category
                    WHERE budget_id = NEW.budget_id
                )
                WHERE budget_id = NEW.budget_id;

                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER trg_update_budget_total_amount
            AFTER INSERT OR UPDATE OR DELETE ON category
            FOR EACH ROW
            EXECUTE FUNCTION update_budget_total_amount();
        `);

    await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_budget_remaining_amount() RETURNS TRIGGER AS $$
            BEGIN
                -- Update remaining amount in category
                UPDATE category
                SET remaining_amount = remaining_amount - NEW.amount
                WHERE category_id = NEW.category_id;

                -- Update remaining amount in budget
                UPDATE budget
                SET remaining_amount = (
                    SELECT COALESCE(SUM(remaining_amount), 0)
                    FROM category
                    WHERE budget_id = NEW.budget_id
                )
                WHERE budget_id = (
                    SELECT budget_id
                    FROM category
                    WHERE category_id = NEW.category_id
                );

                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER trg_update_budget_remaining_amount
            AFTER INSERT ON expense
            FOR EACH ROW
            EXECUTE FUNCTION update_budget_remaining_amount();
        `);

    await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_category_remaining_amount() RETURNS TRIGGER AS $$
            BEGIN
                -- Calculate the difference in expense amount
                IF TG_OP = 'UPDATE' THEN
                    UPDATE category
                    SET remaining_amount = remaining_amount + OLD.amount - NEW.amount
                    WHERE category_id = NEW.category_id;
                END IF;

                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER trg_update_category_remaining_amount
            AFTER UPDATE ON expense
            FOR EACH ROW
            EXECUTE FUNCTION update_category_remaining_amount();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trg_update_budget_total_amount ON category`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS update_budget_total_amount`,
    );

    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trg_update_budget_remaining_amount ON expense`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS update_budget_remaining_amount`,
    );

    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trg_update_category_remaining_amount ON expense`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS update_category_remaining_amount`,
    );
  }
}

