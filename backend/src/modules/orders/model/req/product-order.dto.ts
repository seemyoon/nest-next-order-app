import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class ProductOrderDto {
  @ApiProperty({
    example: 'name of product',
    description: 'name of the product in the order.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 2,
    description: 'Quantity of the product in the order.',
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
