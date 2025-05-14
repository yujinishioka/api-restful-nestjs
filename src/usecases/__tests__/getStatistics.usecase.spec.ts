import { GetStatisticsUseCase } from '../getStatistics.usecase';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { Transaction } from 'src/domain/entities/transaction.entity';

describe('GetStatisticsUseCase', () => {
  let useCase: GetStatisticsUseCase;
  let transactionRepository: jest.Mocked<TransactionRepository>;

  beforeEach(() => {
    transactionRepository = {
      findAll: jest.fn(),
    } as Partial<
      jest.Mocked<TransactionRepository>
    > as jest.Mocked<TransactionRepository>;

    useCase = new GetStatisticsUseCase(transactionRepository);
  });

  it('deve retornar estatísticas de transações nos últimos 60 segundos', async () => {
    const now = Date.now();

    const mockTransactions: Transaction[] = [
      { amount: 100.12, timestamp: new Date(now - 10_000) },
      { amount: 50.5, timestamp: new Date(now - 20_000) },
      { amount: 200.25, timestamp: new Date(now - 70_000) },
    ];

    transactionRepository.findAll.mockResolvedValue(mockTransactions);

    const result = await useCase.execute();

    expect(result).toEqual({
      count: 2,
      sum: 150.62,
      avg: 75.31,
      min: 50.5,
      max: 100.12,
    });
  });

  it('deve retornar zeros quando não houver transações recentes', async () => {
    const oldTimestamp = new Date(Date.now() - 120_000);

    transactionRepository.findAll.mockResolvedValue([
      { amount: 123, timestamp: oldTimestamp },
    ]);

    const result = await useCase.execute();

    expect(result).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });
});
