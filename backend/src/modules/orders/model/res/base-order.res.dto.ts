import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';

import { OrderID } from '../../../../common/types/entity-ids.type';
import { UserResDto } from '../../../user/models/res/user.res.dto';
import { ProductOrderDto } from '../req/product-order.dto';

export class BaseOrderResDto {
  @ApiProperty({ type: String })
  id: OrderID;
  @ApiProperty({
    example: [
      { productId: 'product1-id', quantity: 2 },
      { productId: 'product2-id', quantity: 3 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  products: ProductOrderDto[];
  isReady: boolean;
  user: UserResDto;
  created: Date;
  updated: Date;
}
