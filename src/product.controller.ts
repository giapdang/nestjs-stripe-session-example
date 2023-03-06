import { Controller, Get } from '@nestjs/common';
import StripeService from './stripe/stripe.service';

@Controller('products')
export default class ProductController {
  constructor(private readonly stripeService: StripeService) {}

  @Get()
  async getAllProducts() {
    const products = await this.stripeService.getAllProducts();
    return products.data;
  }
}
