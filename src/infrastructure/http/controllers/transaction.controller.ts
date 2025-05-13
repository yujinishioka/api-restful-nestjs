import { ApiOperation } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionUseCase } from 'src/usecases/createTransaction.usecase';
import { CreateTransactionDto } from '../dtos/createTransaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
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
}
