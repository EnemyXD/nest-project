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

  @Get('id-rd/:id')
  @UseGuards(JwtAuthGuard)
  async getIDRD(@Param('id') id: string): Promise<any> {
    return this.BookRepositoryService.getIDRD(id);
  }

  @Put('update-rd/:id')
  @UseGuards(JwtAuthGuard)
  async updateRD(
    @Param('id') id: string,
    @Body() Book: IBookRepository
  ): Promise<any> {
    return this.BookRepositoryService.updateRD(id, Book);
  }

  @Delete('delete-rd/:id')
  @UseGuards(JwtAuthGuard)
  async deleteRD(@Param('id') id: string): Promise<any> {
    return this.BookRepositoryService.deleteRD(id);
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

  @Get('id-fd/:id')
  @UseGuards(JwtAuthGuard)
  async getIDFD(@Param('id') id: string): Promise<any> {
    return this.BookRepositoryService.getIDFD(id);
  }

  @Put('update-fd/:id')
  @UseGuards(JwtAuthGuard)
  async updatefD(
    @Param('id') id: string,
    @Body() Book: IBookRepository
  ): Promise<any> {
    return this.BookRepositoryService.updateFD(id, Book);
  }

  @Delete('delete-fd/:id')
  @UseGuards(JwtAuthGuard)
  async deletefD(@Param('id') id: string): Promise<any> {
    return this.BookRepositoryService.deleteFD(id);
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
