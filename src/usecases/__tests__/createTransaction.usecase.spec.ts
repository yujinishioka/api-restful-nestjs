/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CreateTransactionUseCase } from '../createTransaction.usecase';
import { UnprocessableEntityException } from '@nestjs/common';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { Transaction } from 'src/domain/entities/transaction.entity';

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;
  let repository: TransactionRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
    } as any;

    useCase = new CreateTransactionUseCase(repository);
  });

  it('deve salvar uma transação válida', async () => {
    const now = new Date();

    const transaction: Transaction = {
      amount: 100,
      timestamp: now,
    };

    await useCase.execute(transaction);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 100,
        timestamp: expect.any(Date),
      }),
    );
  });

  it('deve lançar exceção se o valor for negativo', async () => {
    const transaction: Transaction = {
      amount: -50,
      timestamp: new Date(),
    };

    await expect(useCase.execute(transaction)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });

  it('deve lançar exceção se a data for no futuro', async () => {
    const future = new Date(Date.now() + 60_000);

    const transaction: Transaction = {
      amount: 100,
      timestamp: future,
    };

    await expect(useCase.execute(transaction)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });

  it('deve lançar exceção se a data for inválida', async () => {
    const transaction: any = {
      amount: 100,
      timestamp: 'data-invalida',
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await expect(useCase.execute(transaction)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });
});
