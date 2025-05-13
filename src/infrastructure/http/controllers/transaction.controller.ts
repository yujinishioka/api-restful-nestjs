import { ApiOperation } from '@nestjs/swagger';
import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CreateTransactionUseCase } from 'src/usecases/createTransaction.usecase';
import { ClearTransactionsUseCase } from 'src/usecases/clearTransactions.usecase';
import { CreateTransactionDto } from '../dtos/createTransaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly clearTransactionsUseCase: ClearTransactionsUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar uma nova transação',
    description:
      'Esta rota cria uma nova transação, armazenando o valor e a data.',
  })
  async create(@Body() dto: CreateTransactionDto) {
    await this.createTransactionUseCase.execute(dto);
    return { message: 'Transação registrada com sucesso' };
  }

  @Delete('clear')
  async clear() {
    await this.clearTransactionsUseCase.execute();
    return { message: 'Todas as transações foram removidas com sucesso!' };
  }
}
