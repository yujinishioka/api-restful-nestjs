import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { TRANSACTION_REPOSITORY } from './domain/repositories/transaction.repository';
import { TransactionController } from './infrastructure/http/controllers/transaction.controller';
import { InMemoryTransactionRepository } from './infrastructure/database/repositories/inMemory.repository';
import { WinstonLoggerConfig } from './logger/winston.logger';
import { CreateTransactionUseCase } from './usecases/createTransaction.usecase';
import { ClearTransactionsUseCase } from './usecases/clearTransactions.usecase';
import { GetStatisticsUseCase } from './usecases/getStatistics.usecase';

@Module({
  imports: [WinstonModule.forRoot(WinstonLoggerConfig)],
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
