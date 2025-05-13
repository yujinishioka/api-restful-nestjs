import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'src/domain/entities/transaction.entity';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepository,
} from 'src/domain/repositories/transaction.repository';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(data: Transaction): Promise<void> {
    const transaction: Transaction = {
      amount: data.amount,
      timestamp: new Date(),
    };
    await this.transactionRepository.save(transaction);
  }
}
