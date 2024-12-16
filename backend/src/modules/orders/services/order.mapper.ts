import { OrderEntity } from '../../../database/entities/order.entity';
import { OrderProductEntity } from '../../../database/entities/order-product.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { ListOrdersQueryDto } from '../model/req/list-orders.query.dto';
import { OrderResDto } from '../model/res/order.res.dto';
import { OrdersListResDto } from '../model/res/orders-list.res.dto';

export class OrderMapper {
  private static mapOrderProduct(orderProduct: OrderProductEntity): any {
    //todo typing
    return {
      productId: orderProduct.product.id,
      productName: orderProduct.product.name,
      quantity: orderProduct.quantity,
    };
  }

  public static toResDto(order: OrderEntity): OrderResDto {
    return {
      id: order.id,
      products: order.orderProducts.map(this.mapOrderProduct), // Преобразуем товары заказа
      isReady: order.isReady,
      user: order.user ? UserMapper.toResDto(order.user) : null,
      created: order.createdAt,
      updated: order.updatedAt,
    };
  }

  public static toResDtoList(
    data: OrderEntity[],
    total: number,
    query: ListOrdersQueryDto,
  ): OrdersListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
