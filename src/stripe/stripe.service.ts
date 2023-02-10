import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export default class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  public createSession = async (products) => {
    const sessionId = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: this.generateItems(products),
      mode: 'payment',
      success_url: this.configService.get('SUCCESS_URL'),
      cancel_url: this.configService.get('CANCEL_URL'),
    });
    return sessionId;
  };

  public getAllProducts = () => {
    return this.stripe.products.list();
  };

  private generateItems = (products) => {
    return products.map((product) => ({
      price: product.price_id,
      quantity: product.quantity,
    }));
    // return products.map((product) => {
    //   return {
    //     price_data: {
    //       unit_amount: product.price,
    //       currency: this.configService.get('STRIPE_CURRENCY'),
    //       product_data: {
    //         name: product.name,
    //         description: product.description,
    //         images: product.images,
    //       },
    //     },
    //     quantity: product.quantity,
    //   };
    // });
  };
}
