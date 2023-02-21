import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { PaymentModule } from 'src/payment/payment.module';
import { StripeController } from './stripe.controller';
import StripeService from './stripe.service';

@Module({
  imports: [PaymentModule, InvoiceModule],
  providers: [StripeService, ConfigService],
  controllers: [StripeController],
  exports: [StripeService],
})
export class StripeModule {}
