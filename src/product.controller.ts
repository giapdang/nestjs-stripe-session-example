import { Controller, Get, Body, Put, Param } from '@nestjs/common';
import StripeService from './stripe/stripe.service';
import ProductDetailDto from './dto/productDetail.dto';
import UpdateProductDto from './dto/updateProduct.dto';

@Controller('products')
export default class ProductController {
  constructor(private readonly stripeService: StripeService) {}

  @Get()
  async getAllProducts() {
    const products = await this.stripeService.getAllProducts();
    return products.data;
  }

  @Get(':productId')
  async findOne(@Param() params: ProductDetailDto) {
    const product = await this.stripeService.getProductById(params.productId);
    return product;
  }

  @Put(':productId')
  async update(
    @Param() params: ProductDetailDto,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.stripeService.updateProduct(
      params.productId,
      updateProductDto,
    );

    return product;
  }
}
