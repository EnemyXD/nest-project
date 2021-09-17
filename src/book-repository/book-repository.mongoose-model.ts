import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IBookRepository } from './book-repository.interface';

export type BookRepositoryDocument = Document & IBookRepository;

@Schema()
export class BookRepository {
  @Prop({ required: true })
  public title: string;

  @Prop()
  public author: string;

  @Prop()
  public description: string;
}

export const BookRepositorySchema =
  SchemaFactory.createForClass(BookRepository);
