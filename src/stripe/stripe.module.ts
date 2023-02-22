import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { PaymentModule } from 'src/payment/payment.module';
import { UsersModule } from 'src/users/users.module';
import { StripeController } from './stripe.controller';
import StripeService from './stripe.service';

@Module({
  imports: [forwardRef(() => UsersModule), PaymentModule, InvoiceModule],
  providers: [StripeService, ConfigService],
  controllers: [StripeController],
  exports: [StripeService],
})
export class StripeModule {}
