import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/users.entity';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { IUserData } from '../interfaces/user-data.interface';
import { AuthCacheService } from './auth-cache.service';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly passwordService: PasswordService,
  ) {}

  public async signUp(dto: any): Promise<any> {
    await this.isEmailNotExistOrThrow(dto.email);
    const password = await this.passwordService.hashPassword(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );

    // const tokens = await this.tokenService.generateAuthTokens({
    //   userId: user.id,
    //   deviceId: dto.deviceId,
    // });
    // await Promise.all([
    //   this.authCacheService.saveToken(
    //     tokens.accessToken,
    //     user.id,
    //     dto.deviceId,
    //   ),
    //   this.refreshTokenRepository.save(
    //     this.refreshTokenRepository.create({
    //       user_id: user.id,
    //       deviceId: dto.deviceId,
    //       refreshToken: tokens.refreshToken,
    //     }),
    //   ),
    // ]);
    //
    // return { user: UserMapper.toResDto(user), tokens };
    return {} as any;
  }

  public async signIn(dto: any): Promise<any> {
    // const user = await this.userRepository.findOne({
    //   where: { email: dto.email },
    //   select: ['id', 'password', 'isTemporaryPassword'],
    // });
    // if (!user) {
    //   throw new UnauthorizedException('User not found');
    // }
    //
    // const isPasswordValid = await this.passwordService.comparePassword(
    //   dto.password,
    //   user.password,
    // );
    // if (!isPasswordValid) {
    //   throw new UnauthorizedException('Password is incorrect');
    // }
    //
    // const tokens = await this.tokenService.generateAuthTokens({
    //   userId: user.id,
    //   deviceId: dto.deviceId,
    // });
    // await Promise.all([
    //   this.authCacheService.saveToken(
    //     tokens.accessToken,
    //     user.id,
    //     dto.deviceId,
    //   ),
    //   this.refreshTokenRepository.save(
    //     this.refreshTokenRepository.create({
    //       user_id: user.id,
    //       deviceId: dto.deviceId,
    //       refreshToken: tokens.refreshToken,
    //     }),
    //   ),
    // ]);
    // const userEntity = await this.userRepository.findOneBy({ id: user.id });
    //
    // return { user: UserMapper.toResDto(userEntity), tokens };
    return {} as any;
  }

  public async logOut(userData: IUserData): Promise<void> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceId,
      }),
    ]);
  }

  public async refreshToken(userData: IUserData): Promise<any> {
    // await Promise.all([
    //   this.authCacheService.deleteToken(userData.userId, userData.deviceId),
    //   this.refreshTokenRepository.delete({
    //     user_id: userData.userId,
    //     deviceId: userData.deviceId,
    //   }),
    // ]);
    // const tokens = await this.tokenService.generateAuthTokens({
    //   userId: userData.userId,
    //   deviceId: userData.deviceId,
    // });
    // await Promise.all([
    //   this.authCacheService.saveToken(
    //     tokens.accessToken,
    //     userData.userId,
    //     userData.deviceId,
    //   ),
    //   this.refreshTokenRepository.save(
    //     this.refreshTokenRepository.create({
    //       user_id: userData.userId,
    //       deviceId: userData.deviceId,
    //       refreshToken: tokens.refreshToken,
    //     }),
    //   ),
    // ]);
    // return tokens;
    return {} as any;
  }

  private async returnedChangedPasswordOrThrow(
    userId: UserID,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new ConflictException('User not found');
    }
    // if (password) {
    //   user.password = password;
    // }

    await this.userRepository.save(user);
    return user;
  }

  private async checkOldPassword(
    oldPasswordDto: string,
    passwordDB: string,
  ): Promise<void> {
    const isPasswordValid = await this.passwordService.comparePassword(
      oldPasswordDto,
      passwordDB,
    );
    if (!isPasswordValid) {
      throw new ConflictException('Password is incorrect');
    }
  }

  private async isEmailNotExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new BadRequestException('Email already exists');
    }
  }
}
