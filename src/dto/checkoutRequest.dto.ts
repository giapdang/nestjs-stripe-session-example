import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class CheckoutRequestDto {
  @IsObject()
  @ApiProperty({
    description: 'User object',
  })
  user: {
    email: string;
  };
}

export default CheckoutRequestDto;
