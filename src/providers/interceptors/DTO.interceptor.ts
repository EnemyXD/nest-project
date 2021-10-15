import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class DtoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          status: 'success',
          data: data,
        };
      }),
      catchError((e) => {
        return throwError(new InternalServerErrorException());
      })
    );
  }
}
