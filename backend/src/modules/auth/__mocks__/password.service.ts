import { MockServiceType } from '../../../../test/types/mock-service.type';
import { PasswordService } from '../services/password.service';

export const passwordServiceMock: MockServiceType<PasswordService> = {
  hashPassword: jest.fn(),
  comparePassword: jest.fn(),
};
