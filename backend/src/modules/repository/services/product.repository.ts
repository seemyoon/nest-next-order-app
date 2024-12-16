import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ProductID } from '../../../common/types/entity-ids.type';
import { ProductEntity } from '../../../database/entities/product.entity';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ProductEntity, dataSource.manager);
  }

  public async findProductById(productId: ProductID): Promise<ProductEntity> {
    const qb = this.createQueryBuilder('product');
    qb.leftJoinAndSelect('product.orders', 'product');

    qb.where('product.id = :productId', { productId });
    return await qb.getOne();
  }

  public async findProductByName(name: string): Promise<ProductEntity> {
    const qb = this.createQueryBuilder('product');
    qb.leftJoinAndSelect('product.orders', 'product');

    qb.where('product.name = :name', { name });
    return await qb.getOne();
  }
}
