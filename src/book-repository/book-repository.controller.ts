import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { IBookRepository } from './book-repository.interface';
import { BookRepositoryDocument } from './book-repository.mongoose-model';
import { BookRepositoryService } from './book-repository.service';
import { DtoInterceptor } from './providers/interceptors/DTO.interceptor';
import { JoiValidateScheme } from './providers/pipes/JoiScheme';
import { JoiValidationPipe } from './providers/pipes/JoiValidationPipe';

@Controller('book-repository')
export class BookRepositoryController {
  constructor(private BookRepositoryService: BookRepositoryService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(JoiValidateScheme))
  async create(@Body() Book: IBookRepository): Promise<BookRepositoryDocument> {
    console.log(Book);
    return this.BookRepositoryService.create(Book);
  }

  @Get()
  async findAll(): Promise<BookRepositoryDocument[]> {
    return this.BookRepositoryService.findAll();
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(JoiValidateScheme))
  async update(
    @Param('id') id: string,
    @Body() Book: IBookRepository
  ): Promise<BookRepositoryDocument> {
    return this.BookRepositoryService.update(id, Book);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<BookRepositoryDocument> {
    return this.BookRepositoryService.delete(id);
  }
}
