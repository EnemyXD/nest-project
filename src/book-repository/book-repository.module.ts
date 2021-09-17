import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookRepositoryController } from './book-repository.controller';
import {
  BookRepository,
  BookRepositorySchema,
} from './book-repository.mongoose-model';
import { BookRepositoryService } from './book-repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookRepository.name, schema: BookRepositorySchema },
    ]),
  ],
  controllers: [BookRepositoryController],
  providers: [BookRepositoryService],
})
export class BookRepositoryModule {}
