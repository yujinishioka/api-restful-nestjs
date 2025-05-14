/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { TRANSACTION_REPOSITORY } from './domain/repositories/transaction.repository';
import { TransactionController } from './infrastructure/http/controllers/transaction.controller';
import { HealthController } from './infrastructure/http/controllers/health.controller';
import { InMemoryTransactionRepository } from './infrastructure/database/repositories/inMemory.repository';
import { WinstonLoggerConfig } from './logger/winston.logger';
import { CreateTransactionUseCase } from './usecases/createTransaction.usecase';
import { ClearTransactionsUseCase } from './usecases/clearTransactions.usecase';
import { GetStatisticsUseCase } from './usecases/getStatistics.usecase';
import { MetricsController } from './metrics/metrics.controller';
import { MetricsService } from './metrics/metrics.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    WinstonModule.forRoot(WinstonLoggerConfig),
  ],
  controllers: [
    AppController,
    MetricsController,
    TransactionController,
    HealthController,
  ],
  providers: [
    CreateTransactionUseCase,
    ClearTransactionsUseCase,
    GetStatisticsUseCase,
    MetricsService,
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: InMemoryTransactionRepository,
    },
  ],
})
export class AppModule {}
