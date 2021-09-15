import { Module } from '@nestjs/common';
import { BookRepositoryController } from './book-repository.controller';
import { BookRepositoryService } from './book-repository.service';

@Module({
  controllers: [BookRepositoryController],
  providers: [BookRepositoryService],
})
export class BookRepositoryModule {}
