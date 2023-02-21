import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Payment {
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
  public type: string;

  @Column()
  public stripe_payment_id: string;
}

export default Payment;
