import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IBookComment } from './book-comment.intarface';

export type BookCommentDocument = Document & IBookComment;

@Schema()
export class BookComment {
  @Prop({ required: true })
  public bookID: string;

  @Prop({ required: true })
  public comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);
