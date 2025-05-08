import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { TransformDateInterceptor } from './common/interceptors/transform-date.interceptor';
import { TransformInterceptor } from './common/filters/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const errorFilterFlag = configService.get<string>('ERROR_FILTER');
  const cors = configService.get<string>('CORS', 'false');
  // const prefix = configService.get<string>('PREFIX', 'api/v1');
  // 获取版本号
  // const versionStr = configService.get<string>('VERSION');

  // let version: string[] = [];
  // if (versionStr && versionStr?.indexOf(',')) {
  //   version = versionStr.split(',');
  // }

  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: typeof versionStr === 'undefined' ? VERSION_NEUTRAL : version,
  // });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // app.setGlobalPrefix(prefix);

  // 添加全局日期转换拦截器
  app.useGlobalInterceptors(new TransformDateInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  if (cors === 'true') {
    app.enableCors();
  }

  if (errorFilterFlag === 'true') {
    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  }

  // 全局类管道
  app.useGlobalPipes(
    new ValidationPipe({
      // 去除类上不存的字段
      whitelist: true,
    }),
  );

  await app.listen(port);
}
bootstrap();
