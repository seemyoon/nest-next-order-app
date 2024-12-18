import { UserID } from '../../../common/types/entity-ids.type';
import { UserEnum } from '../../user/enum/users.enum';

export interface IUserData {
  userId: UserID;
  deviceId: string;
  role: UserEnum;
  email: string;
}
