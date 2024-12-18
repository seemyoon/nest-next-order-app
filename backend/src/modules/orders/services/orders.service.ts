import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { OrderID } from '../../../common/types/entity-ids.type';
import { OrderEntity } from '../../../database/entities/order.entity';
import { OrderProductEntity } from '../../../database/entities/order-product.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { OrderRepository } from '../../repository/services/order.repository';
import { OrderProductRepository } from '../../repository/services/order-product.repository';
import { ProductRepository } from '../../repository/services/product.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { BaseOrderReqDto } from '../model/req/base-order.req.dto';
import { ListOrdersQueryDto } from '../model/req/list-orders.query.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderProductRepository: OrderProductRepository,
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  public async getOrders(
    query: ListOrdersQueryDto,
  ): Promise<[OrderEntity[], number]> {
    return await this.orderRepository.findOrders(query);
  }

  public async getClientOrders(
    userData: IUserData,
    query: ListOrdersQueryDto,
  ): Promise<[OrderEntity[], number]> {
    return await this.orderRepository.findClientsOrders(userData, query);
  }

  public async createOrder(
    userData: IUserData,
    dto: BaseOrderReqDto,
  ): Promise<OrderEntity> {
    return await this.entityManager.transaction('SERIALIZABLE', async (em) => {
      const user = await this.userRepository.findUser(userData.userId, em);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const orderRepository = em.getRepository(OrderEntity);

      const products = await Promise.all(
        dto.products.map(async (productDto) => {
          const product = await this.productRepository.findProductByName(
            productDto.name,
          );
          if (!product) {
            throw new NotFoundException(
              `Product with name ${productDto.name} not found`,
            );
          }
          return { product, quantity: productDto.quantity };
        }),
      );

      const order = orderRepository.create({ user });
      await orderRepository.save(order);

      const orderProductRepository = em.getRepository(OrderProductEntity);
      const orderProducts = products.map((product) =>
        orderProductRepository.create({
          order: order,
          product: product.product,
          quantity: product.quantity,
        }),
      );
      await orderProductRepository.save(orderProducts);

      return await this.getOrder(order.id, em);
    });
  }

  public async getOrder(
    orderId: OrderID,
    em?: EntityManager,
  ): Promise<OrderEntity> {
    const order = await this.orderRepository.findOrder(orderId, em);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  public async orderIsDone(orderId: OrderID): Promise<void> {
    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) {
      throw new ConflictException('Order not found');
    }
    order.isReady = true;
    await this.orderRepository.save(order);
  }
}
