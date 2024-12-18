import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class BaseProductReqDto {
  @Type(() => String)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @ApiProperty({
    example: 'Orange',
    description: 'Name of the product',
  })
  name: string;
}
