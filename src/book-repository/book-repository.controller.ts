import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { IBookRepository } from './book-repository.interface';
import { BookRepositoryDocument } from './book-repository.mongoose-model';
import { BookRepositoryService } from './book-repository.service';
import { JoiBookRepositoryScheme } from './JoiValidation/Joi.BookRepository.Scheme';
import { JoiValidationPipe } from '../providers/pipe/JoiValidationPipe';
import { AuthGuard } from 'src/providers/guards/auth.guard';
import { JwtAuthGuard } from 'src/providers/guards/jwtAuth.guard';

@Controller('book-repository')
export class BookRepositoryController {
  constructor(private BookRepositoryService: BookRepositoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(JoiBookRepositoryScheme))
  async create(@Body() Book: IBookRepository): Promise<BookRepositoryDocument> {
    console.log(Book);
    return this.BookRepositoryService.create(Book);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<BookRepositoryDocument[]> {
    return this.BookRepositoryService.findAll();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(JoiBookRepositoryScheme))
  async update(
    @Param('id') id: string,
    @Body() Book: IBookRepository
  ): Promise<BookRepositoryDocument> {
    return this.BookRepositoryService.update(id, Book);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<BookRepositoryDocument> {
    return this.BookRepositoryService.delete(id);
  }
}
