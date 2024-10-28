import { Test, TestingModule } from '@nestjs/testing';
import { SharedBudgetService } from './shared-budget.service';

describe('SharedBudgetService', () => {
  let service: SharedBudgetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedBudgetService],
    }).compile();

    service = module.get<SharedBudgetService>(SharedBudgetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
