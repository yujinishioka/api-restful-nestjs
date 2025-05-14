/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from '../transaction.controller';
import { CreateTransactionUseCase } from 'src/usecases/createTransaction.usecase';
import { ClearTransactionsUseCase } from 'src/usecases/clearTransactions.usecase';
import { GetStatisticsUseCase } from 'src/usecases/getStatistics.usecase';
import { MESSAGES } from 'src/common/messages';

describe('TransactionController', () => {
  let controller: TransactionController;
  let createUseCase: CreateTransactionUseCase;
  let clearUseCase: ClearTransactionsUseCase;
  let statsUseCase: GetStatisticsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: CreateTransactionUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ClearTransactionsUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetStatisticsUseCase,
          useValue: { execute: jest.fn().mockReturnValue({ sum: 0, avg: 0 }) },
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    createUseCase = module.get(CreateTransactionUseCase);
    clearUseCase = module.get(ClearTransactionsUseCase);
    statsUseCase = module.get(GetStatisticsUseCase);
  });

  it('deve criar uma transação', async () => {
    const dto = { amount: 100.5, timestamp: new Date().toISOString() };
    await expect(controller.create(dto)).resolves.toEqual({
      message: MESSAGES.TRANSACTION_ACCEPTED,
    });
    expect(createUseCase.execute).toHaveBeenCalledWith({
      amount: dto.amount,
      timestamp: new Date(dto.timestamp),
    });
  });

  it('deve apagar todas as transações', async () => {
    await expect(controller.clear()).resolves.toEqual({
      message: MESSAGES.TRANSACTIONS_CLEARED,
    });
    expect(clearUseCase.execute).toHaveBeenCalled();
  });

  it('deve retornar as estatísticas', async () => {
    const result = await controller.getStatistics();
    expect(result).toEqual({ sum: 0, avg: 0 });
    expect(statsUseCase.execute).toHaveBeenCalled();
  });
});
