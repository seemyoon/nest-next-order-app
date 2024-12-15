import { UserEntity } from '../../../database/entities/users.entity';
import { JwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { ListUsersQueryDto } from '../models/req/list-users.query.dto';
import { UsersListResDto } from '../models/res/users-list.res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): any {
    return {};
  }

  public static toResDtoList(
    data: UserEntity[],
    total: number,
    query: ListUsersQueryDto,
  ): UsersListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toIUserData(user: UserEntity, jwtPayload: JwtPayload): any {
    return {};
  }
}
