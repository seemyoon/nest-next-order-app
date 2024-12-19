import { MockServiceType } from '../../../../test/types/mock-service.type';
import { UserService } from '../services/user.service';

export const usersServiceMock: MockServiceType<UserService> = {
  getMe: jest.fn(),
  getUsers: jest.fn(),
  deleteMe: jest.fn(),
  createUser: jest.fn(),
  getUser: jest.fn(),
};
