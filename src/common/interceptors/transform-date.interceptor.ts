import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { format } from 'date-fns';

/**
 * 对所有时间戳进行转换
 */
@Injectable()
export class TransformDateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.transformDate(data);
      }),
    );
  }

  private transformDate(data: any): any {
    if (!data) return data;

    if (data instanceof Date) {
      return format(data, 'yyyy-MM-dd HH:mm:ss');
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.transformDate(item));
    }

    if (typeof data === 'object') {
      const transformed = {};
      for (const key in data) {
        if (data[key] instanceof Date) {
          transformed[key] = format(data[key], 'yyyy-MM-dd HH:mm:ss');
        } else if (typeof data[key] === 'object') {
          transformed[key] = this.transformDate(data[key]);
        } else {
          transformed[key] = data[key];
        }
      }
      return transformed;
    }

    return data;
  }
}
