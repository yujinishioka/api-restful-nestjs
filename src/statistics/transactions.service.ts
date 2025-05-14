import { Injectable } from '@nestjs/common';
import { StatisticsGateway } from '../statistics/statistics.gateway';

@Injectable()
export class TransactionsService {
  constructor(private readonly statsGateway: StatisticsGateway) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createTransaction(data: any) {
    // criar transação...
    const stats = this.calculateStatistics();
    this.statsGateway.broadcastStats(stats);
  }

  private calculateStatistics() {
    return {
      total: 100,
      average: 50,
    };
  }
}
