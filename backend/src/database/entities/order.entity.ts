import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { OrderID, UserID } from '../../common/types/entity-ids.type';
import { UserEntity } from './users.entity';
import { ProductEntity } from './product.entity';

@Entity(TableNameEnum.ORDERS)
export class OrdersEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: OrderID;

  @ManyToMany(() => ProductEntity, (entity) => entity.orders)
  products?: ProductEntity[];

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
