import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ProductDetailDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'productId',
    example: 'prod_MxNRAdJFPw7KNs',
  })
  productId: string;
}

export default ProductDetailDto;
