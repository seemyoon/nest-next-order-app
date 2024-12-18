import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ProductID } from '../../../common/types/entity-ids.type';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { BaseProductReqDto } from '../model/req/base-product-req.dto';
import { ListProductsQueryDto } from '../model/req/list-products.query.dto';
import { ProductResDto } from '../model/res/product.res.dto';
import { ProductsListResDto } from '../model/res/products-list.res.dto';
import { ProductMapper } from '../service/products.mapper';
import { ProductService } from '../service/products.service';

@ApiBearerAuth()
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN)
  @Get('getProducts')
  public async getProducts(
    @Query() query: ListProductsQueryDto,
  ): Promise<ProductsListResDto> {
    const [entities, total] = await this.productService.getProducts(query);
    return ProductMapper.toResDtoList(entities, total, query);
  }

  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN)
  @Post('createProduct')
  public async createProduct(
    @Body() dto: BaseProductReqDto,
  ): Promise<ProductResDto> {
    return ProductMapper.toResDto(await this.productService.createProduct(dto));
  }

  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN)
  @Get(':productId')
  public async getProduct(
    @Param('productId', ParseUUIDPipe) productId: ProductID,
  ): Promise<ProductResDto> {
    return ProductMapper.toResDto(
      await this.productService.getProduct(productId),
    );
  }

  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN)
  @Delete(':productId')
  public async deleteMe(
    @Param('productId', ParseUUIDPipe) productId: ProductID,
  ): Promise<void> {
    await this.productService.delete(productId);
  }
}
