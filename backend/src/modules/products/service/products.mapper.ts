import { ProductEntity } from '../../../database/entities/product.entity';
import { ListProductsQueryDto } from '../model/req/list-products.query.dto';
import { ProductResDto } from '../model/res/product.res.dto';
import { ProductsListResDto } from '../model/res/products-list.res.dto';

export class ProductMapper {
  public static toResDto(order: ProductEntity): ProductResDto {
    return {
      id: order.id,
      name: order.name,
      created: order.createdAt,
      updated: order.updatedAt,
    };
  }

  public static toResDtoList(
    data: ProductEntity[],
    total: number,
    query: ListProductsQueryDto,
  ): ProductsListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
