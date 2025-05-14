import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MESSAGES } from 'src/common/messages';
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
    const timestamp = new Date(data.timestamp);
    const now = new Date();

    if (data.amount < 0) {
      throw new UnprocessableEntityException(MESSAGES.NEGATIVE_AMOUNT);
    }

    if (isNaN(timestamp.getTime())) {
      throw new UnprocessableEntityException('Data inválida.');
    }

    if (timestamp > now) {
      throw new UnprocessableEntityException(
        'Transações futuras não são permitidas.',
      );
    }

    await this.transactionRepository.save({
      ...data,
      timestamp,
    });
  }
}
