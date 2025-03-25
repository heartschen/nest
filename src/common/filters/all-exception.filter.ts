import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as requestIp from 'request-ip';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    //获取上下文
    const ctx = host.switchToHttp();
    //获取响应对象
    const response = ctx.getResponse();
    //获取请求对象
    const request = ctx.getRequest();

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg: unknown = exception instanceof HttpException ? exception['response'] : 'Internal server error';

    const responseBody = {
      Headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: new Date().toLocaleDateString(),
      ip: requestIp.getClientIp(request),
      exception: (exception as any)['name'],
      error: msg,
    };

    // 记录错误日志
    this.logger.error(`路径: ${request.url} 方法: ${request.method}`, responseBody);

    // 发送响应
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
