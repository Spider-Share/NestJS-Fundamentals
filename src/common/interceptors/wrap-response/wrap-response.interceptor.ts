import { CallHandler, ExecutionContext, Injectable, NestInterceptor, } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Request Before...');

    return next.handle()
      .pipe(
        map(data => {
          console.log('Response After...', data);
          return ({ data })
        }));
  }
}