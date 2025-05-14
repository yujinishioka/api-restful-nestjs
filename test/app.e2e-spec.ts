/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MESSAGES } from 'src/common/messages';

describe('TransactionController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /transactions - deve criar uma transação válida', async () => {
    const payload = {
      amount: 100.25,
      timestamp: new Date().toISOString(),
    };

    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send(payload)
      .expect(201);

    const responseBody = response.body as { message: string };
    expect(responseBody.message).toEqual(MESSAGES.TRANSACTION_ACCEPTED);
  });

  it('POST /transactions - deve falhar com valor negativo', async () => {
    const payload = {
      amount: -50,
      timestamp: new Date().toISOString(),
    };

    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send(payload)
      .expect(422);

    const responseBody = response.body as { message: string };
    expect(responseBody.message).toEqual(MESSAGES.NEGATIVE_AMOUNT);
  });

  it('GET /transactions/statistics - deve retornar estatísticas', async () => {
    const response = await request(app.getHttpServer())
      .get('/transactions/statistics')
      .expect(200);

    expect(response.body).toHaveProperty('sum');
    expect(response.body).toHaveProperty('avg');
  });

  it('DELETE /transactions/clear - deve apagar todas as transações', async () => {
    const response = await request(app.getHttpServer())
      .delete('/transactions/clear')
      .expect(200);

    const responseBody = response.body as { message: string };
    expect(responseBody.message).toEqual(MESSAGES.TRANSACTIONS_CLEARED);
  });
});
