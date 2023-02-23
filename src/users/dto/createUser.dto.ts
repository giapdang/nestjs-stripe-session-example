import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email',
    minimum: 5,
    default: 'nghiadd@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name',
    minimum: 5,
    default: 'nghiadd',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password',
    minimum: 8,
    default: '12345678abc',
  })
  password: string;
}

export default CreateUserDto;
