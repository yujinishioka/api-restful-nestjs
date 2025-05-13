import { Module } from '@nestjs/common';
import { TransactionController } from './infrastructure/http/controllers/transaction.controller';
import { CreateTransactionUseCase } from './usecases/createTransaction.usecase';
import { InMemoryTransactionRepository } from './infrastructure/database/repositories/inMemory.repository';
import { TRANSACTION_REPOSITORY } from './domain/repositories/transaction.repository';

@Module({
  controllers: [TransactionController],
  providers: [
    CreateTransactionUseCase,
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: InMemoryTransactionRepository,
    },
  ],
})
export class AppModule {}
