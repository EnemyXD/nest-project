import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookCommentController } from './book-comment.controller';
import { BookComment, BookCommentSchema } from './book-comment.mongoose-model';
import { BookCommentService } from './book-comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookComment.name, schema: BookCommentSchema },
    ]),
  ],
  controllers: [BookCommentController],
  providers: [BookCommentService],
})
export class BookCommentModule {}
