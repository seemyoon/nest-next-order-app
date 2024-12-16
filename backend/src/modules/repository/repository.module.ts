import { Global, Module } from '@nestjs/common';

import { OrderRepository } from './services/order.repository';
import { OrderProductRepository } from './services/order-product.repository';
import { ProductRepository } from './services/product.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repository = [
  UserRepository,
  RefreshTokenRepository,
  ProductRepository,
  OrderRepository,
  OrderProductRepository,
];

@Global()
@Module({
  providers: [...repository],
  exports: [...repository],
})
export class RepositoryModule {}
