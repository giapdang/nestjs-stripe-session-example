import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Payment from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async createPayment(userId, invoice) {
    const { id, description, amount_total, quantity, currency } = invoice;
    return this.paymentRepository.create({
      user_id: userId,
      description,
      amount_total,
      quantity,
      currency,
      stripe_payment_id: id,
    });
  }
}
