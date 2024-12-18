import { ListProductsQueryDto } from '../req/list-products.query.dto';
import { ProductResDto } from './product.res.dto';

export class ProductsListResDto extends ListProductsQueryDto {
  data: ProductResDto[];
  total: number;
}
