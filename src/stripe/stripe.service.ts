import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InvoiceService } from 'src/invoice/invoice.service';
import { PaymentService } from 'src/payment/payment.service';
import { UsersService } from 'src/users/users.service';
import Stripe from 'stripe';

@Injectable()
export default class StripeService {
  private stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    private readonly invoiceService: InvoiceService,
    private readonly paymentService: PaymentService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  public createSession = async (stripeCustomerId, products) => {
    const sessionId = await this.stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: this.generateItems(products),
      mode: 'subscription',
      success_url: this.configService.get('SUCCESS_URL'),
      cancel_url: this.configService.get('CANCEL_URL'),
    });
    return sessionId;
  };

  public getAllProducts = () => {
    return this.stripe.products.list();
  };

  public webhook = (body, sig) => {
    const event = this.constructWebhookEvent(body, sig);
    switch (event.type) {
      case 'invoice.payment_succeeded':
        const invoicePaymentSucceeded = event.data.object;
        this.triggerCreatePayment(invoicePaymentSucceeded);
        console.log(
          `invoice.payment_succeeded ${JSON.stringify(
            invoicePaymentSucceeded,
          )}`,
        );
        this.triggerInvoicePayment(invoicePaymentSucceeded);
        break;
      case 'invoice.payment_failed':
        const invoicePaymentFailed = event.data.object as any;
        const { billing_reason } = invoicePaymentFailed;

        if (billing_reason === 'manual') {
          this.triggerCreatePayment(invoicePaymentFailed);
        } else if (billing_reason === 'subscription_create') {
          this.triggerCreatePayment(invoicePaymentFailed);
          this.triggerSubscriptionPayment(invoicePaymentFailed);
        }
        console.log(
          `invoice.payment_failed ${JSON.stringify(invoicePaymentFailed)}`,
        );
        break;
      case 'subscription.payment_succeeded':
        const subscriptionPaymentSucceeded = event.data.object;
        this.triggerSubscriptionPayment(subscriptionPaymentSucceeded);
        console.log(
          `subscription.payment_succeeded ${JSON.stringify(
            subscriptionPaymentSucceeded,
          )}`,
        );
        break;
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
        console.log(JSON.stringify(checkoutSessionCompleted));
        this.triggerCheckoutSessionCompleted(checkoutSessionCompleted);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  };

  private getUserFromObject = async (object) => {
    const { customer } = object;
    return this.userService.findOneByStripeCustomer(customer);
  };

  private triggerCreatePayment = async (object) => {
    const { id } = object;
    const user = await this.getUserFromObject(object);
    const paymentDetail = await this.stripe.checkout.sessions.retrieve(id);
    this.paymentService.createPayment(user.id, paymentDetail);
  };

  private triggerSubscriptionPayment = async (object) => {
    this.triggerInvoicePayment(object);
  };

  private triggerInvoicePayment = async (object) => {
    const { id } = object;
    const user = await this.getUserFromObject(object);
    const invoiceDetail = await this.stripe.invoices.retrieve(id);
    console.log(`invoiceDetail`, invoiceDetail);
    this.invoiceService.createInvoice(user.id, invoiceDetail);
  };

  private triggerCheckoutSessionCompleted = async (object) => {
    const { id } = object;
    const user = await this.getUserFromObject(object);
    const checkoutDetail = await this.stripe.checkout.sessions.listLineItems(
      id,
    );
    this.paymentService.createPayment(user.id, checkoutDetail);
  };

  private constructWebhookEvent = (body, sig) => {
    try {
      return this.stripe.webhooks.constructEvent(
        body,
        sig,
        this.configService.get('STRIPE_ENDPOINT_WEBHOOK_SECRET'),
      );
    } catch (err) {
      console.log(err);
      throw new NotFoundException(`Webhook Error: ${err.message}`);
    }
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
