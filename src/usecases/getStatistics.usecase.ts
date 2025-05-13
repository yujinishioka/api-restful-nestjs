import { Inject, Injectable } from '@nestjs/common';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepository,
} from 'src/domain/repositories/transaction.repository';
import { Transaction } from 'src/domain/entities/transaction.entity';

@Injectable()
export class GetStatisticsUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute() {
    const allTransactions: Transaction[] =
      await this.transactionRepository.findAll();

    const now = Date.now();
    const oneMinuteAgo = now - 60_000;

    const recentTransactions = allTransactions.filter((transactions) => {
      return new Date(transactions.timestamp).getTime() >= oneMinuteAgo;
    });

    const amounts = recentTransactions.map(
      (transactions) => transactions.amount,
    );

    const count = amounts.length;
    const sum = amounts.reduce((total, amount) => total + amount, 0);
    const avg = count === 0 ? 0 : sum / count;
    const min = count === 0 ? 0 : Math.min(...amounts);
    const max = count === 0 ? 0 : Math.max(...amounts);

    return {
      count,
      sum: Number(sum.toFixed(2)),
      avg: Number(avg.toFixed(2)),
      min: Number(min.toFixed(2)),
      max: Number(max.toFixed(2)),
    };
  }
}
