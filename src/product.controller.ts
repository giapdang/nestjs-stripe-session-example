import { Controller, Get } from '@nestjs/common';
import StripeService from './stripe/stripe.service';

@Controller('products')
export default class ProductController {
  constructor(private readonly stripeService: StripeService) {}

  @Get()
  async getAllProducts() {
    return await this.stripeService.getAllProducts();
    // return { data };
  }
}
