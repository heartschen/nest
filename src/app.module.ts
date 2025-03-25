import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from './common/config/config.module';
import { LogsModule } from './common/logger/logs.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, ConfigModule, LogsModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
