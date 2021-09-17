import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { IBookRepository } from './book-repository.interface';
import {
  BookRepository,
  BookRepositoryDocument,
} from './book-repository.mongoose-model';

@Injectable()
export class BookRepositoryService {
  constructor(
    @InjectModel(BookRepository.name)
    private BookRepositoryModel: Model<BookRepositoryDocument>,
    @InjectConnection() private Connection: Connection
  ) {}

  create(Book: IBookRepository): Promise<BookRepositoryDocument> {
    const book = new this.BookRepositoryModel(Book);

    return book.save();
  }

  findAll(): Promise<BookRepositoryDocument[]> {
    const book = this.BookRepositoryModel.find().exec();

    return book;
  }

  update(id: string, data: IBookRepository): Promise<BookRepositoryDocument> {
    const book = this.BookRepositoryModel.findOneAndUpdate(
      { _id: id },
      data
    ).exec();

    return book;
  }

  delete(id: string): Promise<BookRepositoryDocument> {
    const book = this.BookRepositoryModel.findOneAndRemove({ _id: id }).exec();

    return book;
  }
}
