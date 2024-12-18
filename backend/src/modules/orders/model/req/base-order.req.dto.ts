import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { ProductOrderDto } from './product-order.dto';

export class BaseOrderReqDto {
  @ApiProperty({
    example: [
      { name: 'cherry', quantity: 2 },
      { name: 'orange', quantity: 3 },
    ],
    description: 'List of products with product IDs and quantities.',
    type: [ProductOrderDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDto)
  products: ProductOrderDto[];
}
