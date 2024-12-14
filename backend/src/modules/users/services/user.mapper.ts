import { UserEntity } from '../../../database/entities/users.entity';
import { JwtPayload } from '../../auth/interfaces/jwt-payload.interface';

export class UserMapper {
  public static toResDto(user: UserEntity): any {
    return {};
  }

  public static toIUserData(user: UserEntity, jwtPayload: JwtPayload): any {
    return {};
  }
}
