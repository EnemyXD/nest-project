import { Body, Controller, Get, Post } from '@nestjs/common';
import { IBookRepository } from './book-repository.interface';
import { BookRepositoryService } from './book-repository.service';

@Controller('book-repository')
export class BookRepositoryController {
  constructor(private BookRepositoryService: BookRepositoryService) {}

  @Post()
  async create(@Body() Book: IBookRepository) {
    console.log(Book);
    return this.BookRepositoryService.create(Book);
  }

  @Get()
  async findAll() {
    return this.BookRepositoryService.findAll();
  }
}
