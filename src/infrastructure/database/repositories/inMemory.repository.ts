import { Transaction } from 'src/domain/entities/transaction.entity';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';

export class InMemoryTransactionRepository implements TransactionRepository {
  private readonly transactions: Transaction[] = [];

  async save(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
    return Promise.resolve();
  }

  async findAll(): Promise<Transaction[]> {
    return Promise.resolve(this.transactions);
  }

  async deleteAll(): Promise<void> {
    this.transactions.length = 0;
    return Promise.resolve();
  }
}
