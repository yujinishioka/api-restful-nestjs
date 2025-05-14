/* eslint-disable @typescript-eslint/unbound-method */
import { ClearTransactionsUseCase } from '../clearTransactions.usecase';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';

describe('ClearTransactionsUseCase', () => {
  let clearTransactionsUseCase: ClearTransactionsUseCase;
  let transactionRepository: jest.Mocked<TransactionRepository>;

  beforeEach(() => {
    transactionRepository = {
      deleteAll: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<TransactionRepository>;

    clearTransactionsUseCase = new ClearTransactionsUseCase(
      transactionRepository,
    );
  });

  it('deve chamar transactionRepository.deleteAll uma vez', async () => {
    await clearTransactionsUseCase.execute();

    expect(transactionRepository.deleteAll).toHaveBeenCalledTimes(1);
  });
});
