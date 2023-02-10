import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CheckoutDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Price_id get from Stripe',
  })
  price_id: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The quantity of the product',
    minimum: 1,
    default: 1,
  })
  quantity: number;
}

export default CheckoutDto;
