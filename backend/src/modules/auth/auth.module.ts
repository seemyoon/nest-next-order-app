import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { RedisModule } from '../redis/redis.module';
import { AuthController } from './controllers/auth.controller';
import { JwtAccessGuard } from './guards/jwt.access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache.service';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [RedisModule, JwtModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    JwtRefreshGuard,
    AuthService,
    AuthCacheService,
    TokenService,
    PasswordService,
  ],
  exports: [],
})
export class AuthModule {}