import { UserID } from '../../src/common/types/entity-ids.type';
import { UserEntity } from '../../src/database/entities/users.entity';
import { IUserData } from '../../src/modules/auth/interfaces/user-data.interface';
import { UserEnum } from '../../src/modules/user/enum/users.enum';
import { UserResDto } from '../../src/modules/user/models/res/user.res.dto';

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

  static userEntity(properties?: Partial<UserEntity>): UserEntity {
    return {
      id: 'testUserId' as UserID,
      email: 'test@mail.com',
      name: 'Sasha',
      role: UserEnum.CLIENT,
      phoneNumber: '+380631353945',
      password: '123qweQWE',
      deleted: new Date('2024-17-01'),
      createdAt: new Date('2024-17-01'),
      updatedAt: new Date('2024-17-01'),
      ...(properties || {}),
    };
  }

  static toResDto(properties?: Partial<UserResDto>): UserResDto {
    return {
      id: 'testUserId' as UserID,
      email: 'test@mail.com',
      name: 'Sasha',
      role: UserEnum.CLIENT,
      created: new Date('2024-17-01'),
      updated: new Date('2024-17-01'),
      ...(properties || {}),
    };
  }
}
