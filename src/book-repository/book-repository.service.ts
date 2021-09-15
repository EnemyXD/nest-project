import { Injectable } from '@nestjs/common';
import { IBookRepository } from './book-repository.interface';

@Injectable()
export class BookRepositoryService {
  private readonly BookRepository: IBookRepository[] = [];

  create(Book: IBookRepository) {
    this.BookRepository.push(Book);
  }

  findAll(): IBookRepository[] {
    return this.BookRepository;
  }
}
