import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({
    summary: 'Identificar o estado do serviço',
    description:
      'Esta rota retorna o estado do serviço, incluindo o tempo de atividade e o timestamp atual.',
  })
  @ApiResponse({
    status: 200,
    description: 'Serviço ativo e em funcionamento.',
  })
  check() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
