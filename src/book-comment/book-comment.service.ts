import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { IBookComment } from './book-comment.intarface';
import {
  BookComment,
  BookCommentDocument,
} from './book-comment.mongoose-model';

@Injectable()
export class BookCommentService {
  constructor(
    @InjectConnection() private Connection: Connection,
    @InjectModel(BookComment.name)
    private BookCommentModel: Model<BookCommentDocument>
  ) {}

  async newComment(BookComment: IBookComment): Promise<BookCommentDocument> {
    const newBookComment = await new this.BookCommentModel(BookComment);
    return newBookComment.save();
  }

  async findAllComment(): Promise<BookCommentDocument[]> {
    const BookComments = await this.BookCommentModel.find().exec();
    return BookComments;
  }

  async findCommentByBookID(id: string): Promise<BookCommentDocument[]> {
    const BookComment = await this.BookCommentModel.find({ bookID: id }).exec();
    return BookComment;
  }

  async deleteComment(_id: string): Promise<boolean> {
    const BookComment = await this.BookCommentModel.findOne({ _id });
    if (!BookComment) throw new NotFoundException('comment not found');
    await this.BookCommentModel.deleteOne({ _id });
    return true;
  }
}
