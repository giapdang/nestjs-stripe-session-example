import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Invoice {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public user_id: string;

  @Column()
  public description: string;

  @Column()
  public amount_total: number;

  @Column()
  public quantity: number;

  @Column()
  public currency: string;

  @Column()
  public status: string;

  @Column()
  public stripe_invoice_id: string;
}

export default Invoice;
