import { Test, TestingModule } from '@nestjs/testing';
import { SharedBudgetController } from './shared-budget.controller';

describe('SharedBudgetController', () => {
  let controller: SharedBudgetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharedBudgetController],
    }).compile();

    controller = module.get<SharedBudgetController>(SharedBudgetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
