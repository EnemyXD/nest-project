import { Injectable } from '@nestjs/common';
import { IBookRepository } from './book-repository.interface';

@Injectable()
export class BookRepositoryService {
  public books: IBookRepository[] = [];

  create(Book: IBookRepository) {
    this.books.push(Book);
  }

  findAll(): IBookRepository[] {
    return this.books;
  }
}
