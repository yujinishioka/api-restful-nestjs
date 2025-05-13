import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TRANSACTION_REPOSITORY } from './domain/repositories/transaction.repository';
import { TransactionController } from './infrastructure/http/controllers/transaction.controller';
import { InMemoryTransactionRepository } from './infrastructure/database/repositories/inMemory.repository';
import { CreateTransactionUseCase } from './usecases/createTransaction.usecase';
import { ClearTransactionsUseCase } from './usecases/clearTransactions.usecase';
import { GetStatisticsUseCase } from './usecases/getStatistics.usecase';

@Module({
  controllers: [AppController, TransactionController],
  providers: [
    CreateTransactionUseCase,
    ClearTransactionsUseCase,
    GetStatisticsUseCase,
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: InMemoryTransactionRepository,
    },
  ],
})
export class AppModule {}
