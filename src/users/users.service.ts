import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import StripeService from 'src/stripe/stripe.service';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/createUser.dto';
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => StripeService))
    private stripeService: StripeService,
  ) {}

  async create(userData: CreateUserDto) {
    const stripeCustomer = await this.stripeService.createCustomer(
      userData.name,
      userData.email,
    );

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await this.usersRepository.create({
      ...userData,
      password: hashedPassword,
      stripe_customer_id: stripeCustomer.id,
    });
    await this.usersRepository.save(newUser);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      stripe_customer_id: newUser.stripe_customer_id,
      address: newUser.address,
    };
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  async getUserInfo(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ email });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
    };
  }

  async findOneByStripeCustomer(customerId: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ stripe_customer_id: customerId });
  }
}
