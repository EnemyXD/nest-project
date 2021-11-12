import { Logger, UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';
import { from, map, Observable, pipe } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/providers/guards/jwtAuth.guard';
import { IBookComment } from './book-comment.intarface';
import { BookCommentDocument } from './book-comment.mongoose-model';
import { BookCommentService } from './book-comment.service';

@WebSocketGateway(parseInt(process.env.GATEWAY_PORT), {
  namespace: 'book-comment',
})
export class BookCommentGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private BookCommentService: BookCommentService) {}

  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('Gateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('new-comment')
  newComment(
    @MessageBody() data: unknown,
    @ConnectedSocket() client: Socket
  ): any {
    this.BookCommentService.newComment(data as IBookComment);
    this.wss.emit('new-comment', { data });
  }

  @SubscribeMessage('get-all-comments')
  getAllComments(
    @MessageBody() bookID: unknown,
    @ConnectedSocket() client: Socket
  ): Observable<WsResponse<BookCommentDocument[]>> {
    const data = this.BookCommentService.findCommentByBookID(bookID as string);
    return from(data).pipe(
      map((data) => ({ event: 'get-all-comments', data }))
    );
  }
}
