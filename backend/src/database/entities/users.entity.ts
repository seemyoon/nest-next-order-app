import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { UserID } from '../../common/types/entity-ids.type';
import { UserEnum } from '../../modules/user/enum/users.enum';
import { RefreshTokenEntity } from './refresh-token.entity';
import { OrdersEntity } from './order.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: UserID;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  name: string;

  @Column('text')
  phoneNumber: string;

  @Column('text', { select: false })
  password: string;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @Column({ type: 'enum', enum: UserEnum })
  role: UserEnum;

  @OneToMany(() => OrdersEntity, (order) => order.user)
  orders: OrdersEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];
}
