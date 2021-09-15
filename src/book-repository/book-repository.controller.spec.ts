import { Test, TestingModule } from '@nestjs/testing';
import { BookRepositoryController } from './book-repository.controller';

describe('BookRepositoryController', () => {
  let controller: BookRepositoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookRepositoryController],
    }).compile();

    controller = module.get<BookRepositoryController>(BookRepositoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
