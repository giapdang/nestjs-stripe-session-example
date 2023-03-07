import {
  Controller,
  Get,
  Body,
  Put,
  Delete,
  Post,
  Param,
} from '@nestjs/common';
import StripeService from './stripe/stripe.service';
import ProductDetailDto from './dto/productDetail.dto';
import ProductDto from './dto/product.dto';

@Controller('products')
export default class ProductController {
  constructor(private readonly stripeService: StripeService) {}

  @Get()
  async getAllProducts() {
    const products = await this.stripeService.getAllProducts();
    return products.data;
  }

  @Post()
  async createProduct(@Body() productDto: ProductDto) {
    const product = await this.stripeService.createProduct(productDto);
    return product;
  }

  @Get(':productId')
  async findOne(@Param() params: ProductDetailDto) {
    const product = await this.stripeService.getProductById(params.productId);
    return product;
  }

  @Put(':productId')
  async update(
    @Param() params: ProductDetailDto,
    @Body() productDto: ProductDto,
  ) {
    const product = await this.stripeService.updateProduct(
      params.productId,
      productDto,
    );

    return product;
  }

  @Delete(':productId')
  async remove(@Param() params: ProductDetailDto) {
    const product = await this.stripeService.removeProductById(
      params.productId,
    );
    return product;
  }
}
