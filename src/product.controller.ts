import { Controller, Get, Param } from '@nestjs/common';
import StripeService from './stripe/stripe.service';
import ProductDetailDto from './dto/productDetail.dto';

@Controller('products')
export default class ProductController {
  constructor(private readonly stripeService: StripeService) {}

  @Get()
  async getAllProducts() {
    const products = await this.stripeService.getAllProducts();
    return products.data;
  }

  @Get(':productId')
  async findOne(@Param() params: ProductDetailDto) {
    const product = await this.stripeService.getProductById(params.productId);
    return product;
  }
}
