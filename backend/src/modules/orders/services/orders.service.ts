import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { OrderID } from '../../../common/types/entity-ids.type';
import { OrderEntity } from '../../../database/entities/order.entity';
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
    const user = await this.userRepository.findUser(userData.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const products = await Promise.all(
      dto.products.map(async (productDto) => {
        const product = await this.productRepository.findProductByName(
          productDto.name,
        );

        if (!product) {
          throw new NotFoundException(
            `Product with ID ${productDto.name} not found`,
          );
        }

        return { product, quantity: productDto.quantity };
      }),
    );

    const order = this.orderRepository.create({
      user,
    });

    await this.orderRepository.save(order);

    const orderProducts = products.map((prod) => {
      return this.orderProductRepository.create({
        order_id: order.id,
        product_id: prod.product.id,
        quantity: prod.quantity,
      });
    });

    await this.orderProductRepository.save(orderProducts);

    return order;
  }

  public async getOrder(orderId: OrderID): Promise<OrderEntity> {
    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) {
      throw new ConflictException('Order not found');
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
  } //todo :orderId (the client will not be able to look over his order, but the admin can) +
}
