import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'at least 8 characters' })
  @ApiProperty({
    description: 'Email',
    minimum: 8,
    default: 'nghiadd@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'at least 5 characters' })
  @ApiProperty({
    description: 'Name',
    minimum: 5,
    default: 'nghiadd',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'at least 8 characters' })
  @ApiProperty({
    description: 'Password',
    minimum: 8,
    default: '12345678abc',
  })
  password: string;

  @IsString()
  @MinLength(6, { message: 'at least 6 characters' })
  @ApiProperty({
    description: 'address of user',
    minimum: 6,
    example: 'thanh hoa',
  })
  address: string;

  @IsString()
  @MinLength(9, { message: 'at least 9 characters' })
  @ApiProperty({
    description: 'phone_number of user',
    minimum: 9,
    example: '0394068234',
  })
  phone_number: string;
}

export default CreateUserDto;
