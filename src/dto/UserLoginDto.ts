import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'email of user',
    example: 'nghiadd@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'password of user',
    example: '12345678abc',
  })
  password: string;
}
