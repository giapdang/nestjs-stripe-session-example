import {
  BadRequestException,
  Controller,
  Headers,
  Req,
  Post,
  RawBodyRequest,
} from '@nestjs/common';
import { Request } from 'express';

import StripeService from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('webhook')
  async webhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }
    const body = req.rawBody;
    return this.stripeService.webhook(body, signature);
  }
}
