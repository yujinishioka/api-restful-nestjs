import { Module } from '@nestjs/common';
import { TRANSACTION_REPOSITORY } from './domain/repositories/transaction.repository';
import { TransactionController } from './infrastructure/http/controllers/transaction.controller';
import { InMemoryTransactionRepository } from './infrastructure/database/repositories/inMemory.repository';
import { CreateTransactionUseCase } from './usecases/createTransaction.usecase';
import { ClearTransactionsUseCase } from './usecases/clearTransactions.usecase';

@Module({
  controllers: [TransactionController],
  providers: [
    CreateTransactionUseCase,
    ClearTransactionsUseCase,
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: InMemoryTransactionRepository,
    },
  ],
})
export class AppModule {}
