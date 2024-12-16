import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { OrderProductEntity } from '../../../database/entities/order-product.entity';

@Injectable()
export class OrderProductRepository extends Repository<OrderProductEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderProductEntity, dataSource.manager);
  }
}
