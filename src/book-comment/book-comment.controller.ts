import { Body, Controller, Get, Post } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { IBookComment } from './book-comment.intarface';
import { BookCommentDocument } from './book-comment.mongoose-model';
import { BookCommentService } from './book-comment.service';

@WebSocketGateway()
@Controller('book-comment')
export class BookCommentController {
  constructor(private BookCommentService: BookCommentService) {}

  @Post('add')
  async addComment(
    @Body() BookComment: IBookComment
  ): Promise<BookCommentDocument> {
    return this.BookCommentService.newComment(BookComment);
  }

  @Get('all')
  async getAllComments(): Promise<BookCommentDocument[]> {
    return this.BookCommentService.findAllComment();
  }

  @Post('delete')
  async deleteComment(@Body() id: string): Promise<boolean> {
    return this.BookCommentService.deleteComment(id);
  }
}
