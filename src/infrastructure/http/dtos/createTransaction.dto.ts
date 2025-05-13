/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Valor da transação',
    example: 100,
  })
  amount: number;

  @ApiProperty({
    description: 'Data da transação',
    example: new Date().toISOString(),
  })
  timestamp: Date;
}
