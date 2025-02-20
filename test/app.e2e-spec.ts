import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('WordFind API is running!');
  });

  describe('/user', () => {
    it('/user/:deviceId (GET)', () => {
      const deviceId = '123456789';
      return request(app.getHttpServer())
        .get(`/user/${deviceId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success');
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('data');
        });
    });
  });

  describe('/isValid', () => {
    it('/isValid/:word (GET)', () => {
      const word = 'test';
      return request(app.getHttpServer())
        .get(`/isValid/${word}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success');
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('data');
          expect(typeof res.body.data).toBe('boolean');
        });
    });

    it('/isValid/:word/:lan (GET)', () => {
      const word = 'test';
      const lan = 'EN';
      return request(app.getHttpServer())
        .get(`/isValid/${word}/${lan}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success');
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('data');
          expect(typeof res.body.data).toBe('boolean');
        });
    });

    it('/isValid/:word/:lan (GET) - invalid language', () => {
      const word = 'test';
      const lan = 'FR';
      return request(app.getHttpServer())
        .get(`/isValid/${word}/${lan}`)
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', false);
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('data', null);
        });
    });
  });
});
