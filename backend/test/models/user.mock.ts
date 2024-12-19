import { UserID } from '../../src/common/types/entity-ids.type';
import { UserEntity } from '../../src/database/entities/users.entity';
import { IUserData } from '../../src/modules/auth/interfaces/user-data.interface';
import { UserEnum } from '../../src/modules/user/enum/users.enum';
import { ListUsersQueryDto } from '../../src/modules/user/models/req/list-users.query.dto';
import { UserResDto } from '../../src/modules/user/models/res/user.res.dto';
import { UsersListResDto } from '../../src/modules/user/models/res/users-list.res.dto';
import { UserMapper } from '../../src/modules/user/services/user.mapper';

export class UserMock {
  static userData(properties?: Partial<IUserData>): IUserData {
    return {
      userId: 'testUserId' as UserID,
      email: 'test@mail.com',
      deviceId: 'testDeviceId',
      role: UserEnum.CLIENT,
      ...(properties || {}),
    };
  }

  static toResDtoList(properties?: Partial<UsersListResDto>): UsersListResDto {
    const query = new ListUsersQueryDto();
    query.limit = 10;
    query.offset = 0;
    const data = [UserMock.userEntity()].map(UserMapper.toResDto);
    return {
      data,
      total: 20,
      ...query,
      ...(properties || {}),
    };
  }

  static userEntity(properties?: Partial<UserEntity>): UserEntity {
    return {
      id: 'testUserId' as UserID,
      email: 'test@mail.com',
      name: 'Sasha',
      role: UserEnum.CLIENT,
      phoneNumber: '+380631353945',
      password: '123qweQWE',
      deleted: new Date('2024-01-17'),
      createdAt: new Date('2024-01-17'),
      updatedAt: new Date('2024-01-17'),
      ...(properties || {}),
    };
  }

  static toResDto(properties?: Partial<UserResDto>): UserResDto {
    return {
      id: 'testUserId' as UserID,
      email: 'test@mail.com',
      name: 'Sasha',
      role: UserEnum.CLIENT,
      created: new Date('2024-01-17'),
      updated: new Date('2024-01-17'),
      ...(properties || {}),
    };
  }
}
