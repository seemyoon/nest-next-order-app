import { Injectable } from '@nestjs/common';

import { ProductID } from '../../../common/types/entity-ids.type';
import { ProductEntity } from '../../../database/entities/product.entity';
import { ProductRepository } from '../../repository/services/product.repository';
import { BaseProductReqDto } from '../model/req/base-product-req.dto';
import { ListProductsQueryDto } from '../model/req/list-products.query.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async getProducts(
    query: ListProductsQueryDto,
  ): Promise<[ProductEntity[], number]> {
    return await this.productRepository.findProducts(query);
  }

  public async createProduct(dto: BaseProductReqDto): Promise<ProductEntity> {
    return await this.productRepository.save(
      this.productRepository.create({
        name: dto.name,
      }),
    );
  }

  public async getProduct(id: ProductID): Promise<ProductEntity> {
    return await this.productRepository.findProductById(id);
  }
}
