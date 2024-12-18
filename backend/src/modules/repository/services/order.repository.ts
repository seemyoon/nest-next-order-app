import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { OrderID } from '../../../common/types/entity-ids.type';
import { OrderEntity } from '../../../database/entities/order.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ListOrdersQueryDto } from '../../orders/model/req/list-orders.query.dto';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderEntity, dataSource.manager);
  }

  public async findOrder(orderId: OrderID): Promise<OrderEntity> {
    const qb = this.createQueryBuilder('order');
    qb.leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderProducts', 'orderProduct')
      .leftJoinAndSelect('orderProduct.product', 'product')
      .where('order.id = :orderId', { orderId });
    return await qb.getOne();
  }

  public async findOrders(
    query: ListOrdersQueryDto,
  ): Promise<[OrderEntity[], number]> {
    const qb = this.createQueryBuilder('order');
    qb.leftJoinAndSelect(
      'order.orderProducts',
      'orderProduct',
    ).leftJoinAndSelect('orderProduct.product', 'product');

    qb.take(query.limit);
    qb.skip(query.offset);

    return await this.findAndCount();
  }

  public async findClientsOrders(
    userData: IUserData,
    query: ListOrdersQueryDto,
  ): Promise<[OrderEntity[], number]> {
    const qb = this.createQueryBuilder('order');
    qb.leftJoinAndSelect('order.orderProducts', 'orderProduct')
      .leftJoinAndSelect('orderProduct.product', 'product')
      .where('order.user_id = :userId', { userId: userData.userId })
      .take(query.limit)
      .skip(query.offset);

    return await qb.getManyAndCount();
  }
}
