import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { CreateTransactionDto } from '../dtos/createTransaction.dto';
import { MESSAGES } from 'src/common/messages';
import { CreateTransactionUseCase } from 'src/usecases/createTransaction.usecase';
import { ClearTransactionsUseCase } from 'src/usecases/clearTransactions.usecase';
import { GetStatisticsUseCase } from 'src/usecases/getStatistics.usecase';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly clearTransactionsUseCase: ClearTransactionsUseCase,
    private readonly getStatisticsUseCase: GetStatisticsUseCase,
  ) {}

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post()
  @ApiOperation({
    summary: 'Criar uma nova transação',
    description:
      'Esta rota cria uma nova transação, armazenando o valor e a data.',
  })
  @ApiResponse({ status: 201, description: MESSAGES.TRANSACTION_ACCEPTED })
  @ApiResponse({
    status: 422,
    description: 'Transação rejeitada por violar alguma regra de negócio.',
  })
  @ApiResponse({ status: 400, description: 'JSON malformado.' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateTransactionDto) {
    const transaction = {
      amount: dto.amount,
      timestamp: new Date(dto.timestamp),
    };
    await this.createTransactionUseCase.execute(transaction);
    return { message: MESSAGES.TRANSACTION_ACCEPTED };
  }

  @Delete('clear')
  @ApiOperation({
    summary: 'Apagar todas as transações',
    description: 'Esta rota apaga todas as transações registradas no momento.',
  })
  @ApiResponse({
    status: 200,
    description: MESSAGES.TRANSACTIONS_CLEARED,
  })
  async clear() {
    await this.clearTransactionsUseCase.execute();
    return { message: MESSAGES.TRANSACTIONS_CLEARED };
  }

  @Get('/statistics')
  @ApiOperation({
    summary: 'Obter estatísticas das transações',
    description: 'Retorna estatísticas das transações feitas no último minuto.',
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas retornadas com sucesso.',
  })
  getStatistics() {
    return this.getStatisticsUseCase.execute();
  }
}
