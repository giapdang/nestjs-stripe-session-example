import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeModule } from 'src/stripe/stripe.module';
import User from './user.entity';
import { UsersService } from './users.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => StripeModule)],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
  controllers: [UserController],
})
export class UsersModule {}
