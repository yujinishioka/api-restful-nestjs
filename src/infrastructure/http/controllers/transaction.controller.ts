import { ApiOperation } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/createTransaction.dto';
import { CreateTransactionUseCase } from 'src/usecases/createTransaction.usecase';
import { ClearTransactionsUseCase } from 'src/usecases/clearTransactions.usecase';
import { GetStatisticsUseCase } from 'src/usecases/getStatistics.usecase';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly clearTransactionsUseCase: ClearTransactionsUseCase,
    private readonly getStatisticsUseCase: GetStatisticsUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar uma nova transação',
    description:
      'Esta rota cria uma nova transação, armazenando o valor e a data.',
  })
  async create(@Body() dto: CreateTransactionDto) {
    await this.createTransactionUseCase.execute(dto);
    return { message: 'Transação aceita e registrada.' };
  }

  @Delete('clear')
  @ApiOperation({
    summary: 'Apagar todas as transações',
    description: 'Esta rota apaga todas as transações registradas no momento.',
  })
  async clear() {
    await this.clearTransactionsUseCase.execute();
    return { message: 'Todas as transações foram apagadas com sucesso.' };
  }

  @Get('/statistics')
  @ApiOperation({
    summary: 'Obter estatísticas das transações',
    description: 'Retorna estatísticas das transações feitas no último minuto.',
  })
  getStatistics() {
    return this.getStatisticsUseCase.execute();
  }
}
