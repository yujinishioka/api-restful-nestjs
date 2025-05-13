import { Transaction } from '../entities/transaction.entity';

export const TRANSACTION_REPOSITORY = Symbol('TRANSACTION_REPOSITORY');

export interface TransactionRepository {
  save(transaction: Transaction): Promise<void>;
  findAll(): Promise<Transaction[]>;
}
