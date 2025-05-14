import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.use(helmet());

  const logger = new Logger('Bootstrap');
  logger.log('Aplicação iniciando...');

  const config = new DocumentBuilder()
    .setTitle('API RESTful - Transações')
    .setDescription(
      'Api de transações que retorna estatisticas das transações realizadas nos últimos 60 segundos.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
