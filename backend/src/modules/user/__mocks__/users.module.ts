import { Provider } from '@nestjs/common';

import { authCacheServiceMock } from '../../auth/__mocks__/auth-cache.service';
import { passwordServiceMock } from '../../auth/__mocks__/password.service';
import { AuthCacheService } from '../../auth/services/auth-cache.service';
import { PasswordService } from '../../auth/services/password.service';
import { refreshTokenRepositoryMock } from '../../repository/__mocks__/refresh-token.repository';
import { userRepositoryMock } from '../../repository/__mocks__/user.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserService } from '../services/user.service';
import { usersServiceMock } from './users.service';

export const userMockProviders: Provider[] = [
  {
    provide: UserService,
    useValue: usersServiceMock,
  },
  {
    provide: UserRepository,
    useValue: userRepositoryMock,
  },
  {
    provide: AuthCacheService,
    useValue: authCacheServiceMock,
  },
  {
    provide: PasswordService,
    useValue: passwordServiceMock,
  },
  {
    provide: RefreshTokenRepository,
    useValue: refreshTokenRepositoryMock,
  },
];
