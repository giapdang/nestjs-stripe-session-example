import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Invoice from './invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async createInvoice(userId, invoice) {
    const { id, description, amount_total, quantity, currency, status } =
      invoice;
    return this.invoiceRepository.create({
      user_id: userId,
      description,
      amount_total,
      quantity,
      currency,
      status,
      stripe_invoice_id: id,
    });
  }
}
