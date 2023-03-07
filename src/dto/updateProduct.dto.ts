import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'name of stripe product',
    example: 'Node programming',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'description of stripe product',
    example: 'It is very hard to learn',
  })
  description: string;

  @IsObject()
  @ApiProperty({
    description: 'metadata if stripe product',
    example: { productType: 'gold' },
  })
  metadata: object;
}

export default UpdateProductDto;
