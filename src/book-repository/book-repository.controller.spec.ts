import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { BookRepositoryController } from './book-repository.controller';
import { BookRepositoryModule } from './book-repository.module';
import {
  BookRepository,
  BookRepositorySchema,
} from './book-repository.mongoose-model';
import { BookRepositoryService } from './book-repository.service';
import * as request from 'supertest';
import { JwtAuthGuard } from '../providers/guards/jwtAuth.guard';

describe('BookRepositortController', () => {
  let app: INestApplication;
  let service: BookRepositoryService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        BookRepositoryModule,
        MongooseModule.forRoot(process.env.DB_HOST, {
          user: process.env.DB_USERNAME,
          pass: process.env.DB_PASSWORD,
          dbName: 'book-repository',
          useFindAndModify: false,
        }),
        MongooseModule.forFeature([
          { name: BookRepository.name, schema: BookRepositorySchema },
        ]),
      ],
      providers: [BookRepositoryService],
      controllers: [BookRepositoryController],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(null)
      .compile();
    service = module.get<BookRepositoryService>(BookRepositoryService);
    app = module.createNestApplication();
    app.init();
  });

  it('GET books', () => {
    return request(app.getHttpServer()).get('/book-repository').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
