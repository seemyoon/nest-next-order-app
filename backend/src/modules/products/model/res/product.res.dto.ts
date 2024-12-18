import { PickType } from '@nestjs/swagger';

import { BaseProductResDto } from './base-product.res.dto';

export class ProductResDto extends PickType(BaseProductResDto, [
  'id',
  'name',
  'created',
  'updated',
]) {}
