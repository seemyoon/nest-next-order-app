import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  VirtualColumn,
} from 'typeorm';

import { ProductID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { OrdersEntity } from './order.entity';

@Entity(TableNameEnum.ORDERS)
export class ProductEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: ProductID;

  @Column('text')
  name: string;

  @ManyToMany(() => OrdersEntity, (entity) => entity.products)
  @JoinTable()
  orders?: OrdersEntity[];

  @Column('decimal')
  quantity: number;
}
