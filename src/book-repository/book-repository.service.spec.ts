import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  BookRepository,
  BookRepositorySchema,
} from './book-repository.mongoose-model';
import { BookRepositoryService } from './book-repository.service';
import { IBookRepository } from './book-repository.interface';
import { BookRepositoryController } from './book-repository.controller';
import { BookRepositoryModule } from './book-repository.module';

describe('BookRepositoryService', () => {
  let service: BookRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    service = module.get<BookRepositoryService>(BookRepositoryService);
  });

  it('should be defined', async () => {
    const book: IBookRepository = {
      title: 'title',
      author: 'author',
      description: 'description',
    };
    expect(await service.create(book)).toBeDefined();
  });
});
