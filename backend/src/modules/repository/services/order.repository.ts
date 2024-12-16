import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { OrderEntity } from '../../../database/entities/order.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ListOrdersQueryDto } from '../../orders/model/req/list-orders.query.dto';
import { OrderID, ProductID } from '../../../common/types/entity-ids.type';
import { ProductEntity } from '../../../database/entities/product.entity';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderEntity, dataSource.manager);
  }

  public async findOrder(orderId: OrderID): Promise<OrderEntity> {
    const qb = this.createQueryBuilder('order');
    qb.leftJoinAndSelect('orders.product', 'orders');

    qb.where('product.id = :orderId', { orderId });
    return await qb.getOne();
  }

  public async findOrders(
    query: ListOrdersQueryDto,
  ): Promise<[OrderEntity[], number]> {
    return await this.findAndCount();
  }

  public async findClientsOrders(
    userData: IUserData,
    query: ListOrdersQueryDto,
  ): Promise<[OrderEntity[], number]> {
    return await this.findAndCount();
  }
}
