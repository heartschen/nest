import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';

/**
 * 加载环境变量
 */
const envFilePath = [`.env.${process.env.NODE_ENV || 'development'}`, '.env'];

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      envFilePath,

      // 加载环境变量的校验规则
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().valid('development', 'production').default('development'),
        DB_HOST: Joi.string().ip(),
        DB_PORT: Joi.number().default(3306),
      }),
    }),
  ],
})
export class ConfigModule {}
