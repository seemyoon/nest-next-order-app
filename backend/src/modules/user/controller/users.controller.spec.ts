import { Test } from '@nestjs/testing';

import { UserMock } from '../../../../test/models/user.mock';
import { UserEntity } from '../../../database/entities/users.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { userMockProviders } from '../__mocks__/users.module';
import { ListUsersQueryDto } from '../models/req/list-users.query.dto';
import { UserResDto } from '../models/res/user.res.dto';
import { UsersListResDto } from '../models/res/users-list.res.dto';
import { UserMapper } from '../services/user.mapper';
import { UserService } from '../services/user.service';
import { UserController } from './users.controller';

describe(UserController.name, () => {
  let usersController: UserController;
  let mockUsersService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [...userMockProviders],
    }).compile();
    usersController = module.get<UserController>(UserController);

    mockUsersService = module.get<UserService>(UserService);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('getMe', () => {
    it('should return user', async () => {
      const userResDto: UserResDto = UserMock.toResDto();
      const userData: IUserData = UserMock.userData();
      const userEntity: UserEntity = UserMock.userEntity();

      jest.spyOn(mockUsersService, 'getMe').mockResolvedValue(userEntity);
      jest.spyOn(UserMapper, 'toResDto').mockReturnValue(userResDto);

      const result = await usersController.getMe(userData);

      expect(result).toEqual(userResDto);
    });
  });
  describe('getUsers', () => {
    it('should return users', async () => {
      const query: ListUsersQueryDto = { limit: 10, offset: 0 };
      const userEntities: UserEntity[] = [UserMock.userEntity()];
      const totalUsers = 20;
      const userResDto: UsersListResDto = UserMock.toResDtoList({
        data: userEntities.map(UserMapper.toResDto),
        total: totalUsers,
        ...query,
      });

      jest
        .spyOn(mockUsersService, 'getUsers')
        .mockResolvedValue([userEntities, totalUsers]);
      jest.spyOn(UserMapper, 'toResDtoList').mockReturnValue(userResDto);

      const result = await usersController.getUsers(query);

      expect(result).toEqual(userResDto);
    });
  });
});
