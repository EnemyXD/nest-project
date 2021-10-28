import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookCommentController } from './book-comment.controller';
import { BookCommentGateway } from './book-comment.gateway';
import { BookComment, BookCommentSchema } from './book-comment.mongoose-model';
import { BookCommentService } from './book-comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookComment.name, schema: BookCommentSchema },
    ]),
  ],
  controllers: [BookCommentController],
  providers: [BookCommentService, BookCommentGateway],
})
export class BookCommentModule {}
