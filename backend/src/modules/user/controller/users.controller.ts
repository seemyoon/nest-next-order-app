import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserID } from '../../../common/types/entity-ids.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAccessGuard } from '../../auth/guards/jwt.access.guard';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ROLES } from '../decorators/roles.decorator';
import { UserEnum } from '../enum/users.enum';
import { RolesGuard } from '../guard/roles.guard';
import { ListUsersQueryDto } from '../models/req/list-users.query.dto';
import { UserResDto } from '../models/res/user.res.dto';
import { UsersListResDto } from '../models/res/users-list.res.dto';
import { UserMapper } from '../services/user.mapper';
import { UserService } from '../services/user.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getClient')
  public async getClient(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResDto> {
    return UserMapper.toResDto(await this.userService.getClient(userData));
  }

  @Get('getAdmin')
  public async getAdmin(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResDto> {
    return UserMapper.toResDto(await this.userService.getAdmin(userData));
  }

  @Delete('deleteMe')
  public async deleteMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.userService.deleteMe(userData);
  }

  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN)
  @Get('getUsers')
  public async getUsers(
    @Query() query: ListUsersQueryDto,
  ): Promise<UsersListResDto> {
    const [entities, total] = await this.userService.getUsers(query);
    return UserMapper.toResDtoList(entities, total, query);
  }

  @Get(':userId')
  public async getUser(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<UserResDto> {
    return UserMapper.toResDto(await this.userService.getUser(userId));
  }
}
