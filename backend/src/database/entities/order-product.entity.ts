import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  OrderID,
  OrderProductID,
  ProductID,
} from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity(TableNameEnum.ORDER_PRODUCTS)
export class OrderProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: OrderProductID;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;
  @Column()
  order_id: OrderID;

  @ManyToOne(() => ProductEntity, (product) => product.orderProducts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
  @Column()
  product_id: ProductID;

  @Column('decimal')
  quantity: number;
}
