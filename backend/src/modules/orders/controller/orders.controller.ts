import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { OrderID } from '../../../common/types/entity-ids.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { BaseOrderReqDto } from '../model/req/base-order.req.dto';
import { ListOrdersQueryDto } from '../model/req/list-orders.query.dto';
import { OrderResDto } from '../model/res/order.res.dto';
import { OrdersListResDto } from '../model/res/orders-list.res.dto';
import { OrderMapper } from '../services/order.mapper';
import { OrdersService } from '../services/orders.service';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('getClientOrders')
  public async getClientOrders(
    @CurrentUser() userData: IUserData,
    @Query() query: ListOrdersQueryDto,
  ): Promise<OrdersListResDto> {
    const [entities, total] = await this.ordersService.getClientOrders(
      userData,
      query,
    );
    return OrderMapper.toResDtoList(entities, total, query);
  }

  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN)
  @Get('getOrders')
  public async getOrders(
    @Query() query: ListOrdersQueryDto,
  ): Promise<OrdersListResDto> {
    const [entities, total] = await this.ordersService.getOrders(query);
    return OrderMapper.toResDtoList(entities, total, query);
  }

  @Post('createOrder')
  public async createOrder(
    @CurrentUser() userData: IUserData,
    @Body() dto: BaseOrderReqDto,
  ): Promise<OrderResDto> {
    return OrderMapper.toResDto(
      await this.ordersService.createOrder(userData, dto),
    );
  }

  @Post('orderIsDone/:orderId')
  public async orderIsDone(
    @Param('orderId', ParseUUIDPipe) orderId: OrderID,
  ): Promise<void> {
    await this.ordersService.orderIsDone(orderId);
  }

  @Get(':orderId')
  public async getOrder(
    @Param('orderId', ParseUUIDPipe) orderId: OrderID,
  ): Promise<OrderResDto> {
    return OrderMapper.toResDto(await this.ordersService.getOrder(orderId));
  }
}
