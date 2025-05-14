import { InMemoryTransactionRepository } from '../inMemory.repository';
import { Transaction } from 'src/domain/entities/transaction.entity';

describe('InMemoryTransactionRepository', () => {
  let repository: InMemoryTransactionRepository;

  beforeEach(() => {
    repository = new InMemoryTransactionRepository();
  });

  it('deve salvar uma transação', async () => {
    const transaction: Transaction = {
      amount: 100,
      timestamp: new Date(),
    };

    await repository.save(transaction);

    const all = await repository.findAll();
    expect(all).toHaveLength(1);
    expect(all[0]).toEqual(transaction);
  });

  it('deve retornar todas as transações', async () => {
    const t1: Transaction = { amount: 50, timestamp: new Date() };
    const t2: Transaction = { amount: 150, timestamp: new Date() };

    await repository.save(t1);
    await repository.save(t2);

    const all = await repository.findAll();
    expect(all).toEqual([t1, t2]);
  });

  it('deve apagar todas as transações', async () => {
    await repository.save({ amount: 999, timestamp: new Date() });

    await repository.deleteAll();

    const all = await repository.findAll();
    expect(all).toEqual([]);
  });
});
