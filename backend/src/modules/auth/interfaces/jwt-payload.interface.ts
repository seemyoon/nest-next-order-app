import { UserID } from '../../../common/types/entity-ids.type';

export interface JwtPayload {
  deviceId: string;
  userId: UserID;
}
