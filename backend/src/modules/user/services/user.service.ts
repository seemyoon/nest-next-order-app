import { ConflictException, Injectable } from '@nestjs/common';
import { IsNull, Not } from 'typeorm';

import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/users.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ListUsersQueryDto } from '../models/req/list-users.query.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async getClient(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findUser(userData.userId);
  }

  public async getUsers(
    query: ListUsersQueryDto,
  ): Promise<[UserEntity[], number]> {
    return await this.userRepository.findAll(query);
  }

  public async deleteMe(userData: IUserData): Promise<void> {
    await this.userRepository.update(
      { id: userData.userId },
      { deleted: new Date() },
    );
    await this.refreshTokenRepository.delete({ user_id: userData.userId });
  }

  public async getUser(userId: UserID): Promise<UserEntity> {
    const user = await this.userRepository.findUser(userId);

    if (!user) {
      throw new ConflictException('User not found');
    }
    return user;
  }

  private async isDeleted(userId: UserID): Promise<void> {
    const isDeleted = await this.userRepository.findOneBy({
      id: userId,
      deleted: Not(IsNull()),
    });
    if (isDeleted) {
      throw new ConflictException(
        'You are limited in your options because you are deleted',
      );
    }
  }
}
