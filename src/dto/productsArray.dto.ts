import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class Product {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Price_id get from Stripe',
    example: 'price_1MDSgSF4QIiwHAy1G6aG77cQ',
  })
  price_id: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The quantity of the product',
    minimum: 1,
    example: 1,
  })
  quantity: number;
}

export default class ProductsArrayDto {
  @ApiProperty({ isArray: true, type: Product })
  public products: Product[];
}
