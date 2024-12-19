import { Test } from '@nestjs/testing';

import { UserMock } from '../../../../test/models/user.mock';
import { UserEntity } from '../../../database/entities/users.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { PasswordService } from '../../auth/services/password.service';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { userMockProviders } from '../__mocks__/users.module';
import { UserService } from './user.service';

describe(UserService.name, () => {
  let service: UserService;

  let mockUserRepository: UserRepository;
  let mockrefreshTokenRepository: RefreshTokenRepository;
  let passwordService: PasswordService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [...userMockProviders, UserService],
    }).compile();
    service = module.get<UserService>(UserService);

    mockUserRepository = module.get<UserRepository>(UserRepository);
    mockrefreshTokenRepository = module.get<RefreshTokenRepository>(
      RefreshTokenRepository,
    );
    passwordService = module.get<PasswordService>(PasswordService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMe', () => {
    it('should return user', async () => {
      const userData: IUserData = UserMock.userData();
      const userEntity: UserEntity = UserMock.userEntity();

      jest.spyOn(mockUserRepository, 'findUser').mockResolvedValue(userEntity);

      const result = await service.getMe(userData);

      expect(mockUserRepository.findUser).toHaveBeenNthCalledWith(
        1,
        userData.userId,
      );
      expect(result).toBe(userEntity);
      expect(result.email).toBe(userEntity.email);
    });
  });
});
