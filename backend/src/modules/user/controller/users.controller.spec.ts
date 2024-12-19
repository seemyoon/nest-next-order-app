import { Test } from '@nestjs/testing';

import { UserMock } from '../../../../test/models/user.mock';
import { UserEntity } from '../../../database/entities/users.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { userMockProviders } from '../__mocks__/users.module';
import { UserResDto } from '../models/res/user.res.dto';
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
});
