import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IBookRepository } from './book-repository.interface';
import { BookRepositoryDocument } from './book-repository.mongoose-model';
import { BookRepositoryService } from './book-repository.service';

@Controller('book-repository')
export class BookRepositoryController {
  constructor(private BookRepositoryService: BookRepositoryService) {}

  @Post()
  async create(@Body() Book: IBookRepository): Promise<BookRepositoryDocument> {
    console.log(Book);
    return this.BookRepositoryService.create(Book);
  }

  @Get()
  async findAll(): Promise<BookRepositoryDocument[]> {
    return this.BookRepositoryService.findAll();
  }

  @Put(':id')
  async update(
    @Param() id: string,
    @Body() Book: IBookRepository
  ): Promise<BookRepositoryDocument> {
    return this.BookRepositoryService.update(id, Book);
  }

  @Delete(':id')
  async delete(@Param() id: string): Promise<BookRepositoryDocument> {
    return this.BookRepositoryService.delete(id);
  }
}
