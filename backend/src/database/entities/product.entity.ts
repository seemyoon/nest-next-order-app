import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProductID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { OrderProductEntity } from './order-product.entity';

@Entity(TableNameEnum.PRODUCTS)
export class ProductEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: ProductID;

  @Column('text')
  name: string;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  orderProducts: OrderProductEntity[];
}
