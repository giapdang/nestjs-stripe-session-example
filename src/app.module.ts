import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import StripeService from './stripe/stripe.service';
import ProductController from './product.controller';
import CheckoutController from './checkout.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
      }),
    }),
  ],
  controllers: [AppController, ProductController, CheckoutController],
  providers: [AppService, StripeService],
})
export class AppModule {}
