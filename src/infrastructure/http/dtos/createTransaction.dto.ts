/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @ApiProperty({
    description: 'Valor da transação',
    example: 100,
  })
  amount: number;

  @IsISO8601()
  @ApiProperty({
    description: 'Data da transação',
    example: new Date().toISOString(),
  })
  timestamp: string;
}
