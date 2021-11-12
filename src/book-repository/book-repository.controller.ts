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
import { JwtAuthGuard } from '../providers/guards/jwtAuth.guard';

@Controller('book-repository')
export class BookRepositoryController {
  constructor(private BookRepositoryService: BookRepositoryService) {}

  @Post('rd')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(JoiBookRepositoryScheme))
  async createRD(
    @Body() Book: IBookRepository
  ): Promise<BookRepositoryDocument> {
    return this.BookRepositoryService.createRD(Book);
  }

  @Get('all-rd')
  @UseGuards(JwtAuthGuard)
  async getAllRD(): Promise<any> {
    return this.BookRepositoryService.getAllRD();
  }

  @Get('id-rd')
  @UseGuards(JwtAuthGuard)
  async getIDRD(@Body() id: string): Promise<any> {
    return this.BookRepositoryService.getIDRD(id);
  }

  @Post('fd')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(JoiBookRepositoryScheme))
  async createFD(
    @Body() Book: IBookRepository
  ): Promise<BookRepositoryDocument> {
    return this.BookRepositoryService.createFD(Book);
  }

  @Get('all-fd')
  @UseGuards(JwtAuthGuard)
  async getAllFD(): Promise<any> {
    return this.BookRepositoryService.getAllFD();
  }

  @Get('id-fd')
  @UseGuards(JwtAuthGuard)
  async getIDFD(@Body() id: string): Promise<any> {
    return this.BookRepositoryService.getIDFD(id);
  }

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
