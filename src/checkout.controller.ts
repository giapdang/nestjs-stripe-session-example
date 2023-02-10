import { Body, Controller, Post } from '@nestjs/common';
import CheckoutDto from './dto/checkout.dto';
import StripeService from './stripe/stripe.service';

@Controller('checkout')
export default class CheckoutController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async createSession(@Body() products: CheckoutDto) {
    return this.stripeService.createSession(products);
  }
}
