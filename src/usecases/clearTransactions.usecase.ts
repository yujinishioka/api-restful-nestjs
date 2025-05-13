import { Inject, Injectable } from '@nestjs/common';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepository,
} from 'src/domain/repositories/transaction.repository';

@Injectable()
export class ClearTransactionsUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(): Promise<void> {
    await this.transactionRepository.deleteAll();
  }
}
