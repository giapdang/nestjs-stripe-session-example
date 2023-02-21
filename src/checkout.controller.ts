import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import CheckoutDto from './dto/checkout.dto';
import StripeService from './stripe/stripe.service';
import { UsersService } from './users/users.service';

@Controller('checkout')
export default class CheckoutController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createSession(@Body() products: CheckoutDto, @Req() req) {
    const { email } = req.user;
    const userInfo = await this.userService.findOne(email);
    if (!userInfo) {
      throw new NotFoundException('User not found!');
    }
    const stripeCustomerId = userInfo.stripe_customer_id;
    return this.stripeService.createSession(stripeCustomerId, products);
  }
}
