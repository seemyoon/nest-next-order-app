import { ApiProperty } from '@nestjs/swagger';

import { ProductID } from '../../../../common/types/entity-ids.type';

export class BaseProductResDto {
  @ApiProperty({ type: String })
  id: ProductID;
  name: string;
  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Created field',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Updated field',
  })
  updated: Date;
}
