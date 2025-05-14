import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  @ApiOperation({
    summary: 'Mostra a métrica do serviço realizada pelo Prometheus',
    description:
      'Esta rota retorna as métricas do serviço, como utilização de CPU, processo de memória, performance, quantidade de recursos ativos e ciclos de coleta de lixo.',
  })
  @ApiResponse({
    status: 200,
    description: 'Métricas do serviço funcionando.',
  })
  async getMetrics(@Res() res: Response) {
    const metrics = await this.metricsService.getMetrics();
    res.set('Content-Type', 'text/plain');
    res.send(metrics);
  }
}
