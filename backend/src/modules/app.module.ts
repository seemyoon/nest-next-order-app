import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { GlobalExceptionFilter } from '../common/filters/global-exception.filter';
import configuration from '../configs/configuration';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { PostgresModule } from './postgres/postgres.module';
import { AuthModule } from './auth/auth.module';
import { RepositoryModule } from './repository/repository.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    LoggerModule,
    UserModule,
    AuthModule,
    OrdersModule,
    RepositoryModule,
    RedisModule,
    ProductsModule,
    PostgresModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
