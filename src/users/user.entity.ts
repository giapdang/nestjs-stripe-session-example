import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password?: string;

  @Column()
  public stripe_customer_id?: string;

  @Column()
  public address?: string;
}

export default User;
