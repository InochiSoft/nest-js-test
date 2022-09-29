import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ProductService } from '../../service/product/service';
import { CreateProductDto } from '../../dto/product/create.dto';
import { UpdateProductDto } from '../../dto/product/update.dto';
import { StaffGuard } from '../../guard/staff.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @UseGuards(StaffGuard)
  @Post()
  async createProduct(
    @Res() response: any,
    @Body() createProductDto: CreateProductDto
  ) {
    try {
      const data = await this.productService.createProduct(createProductDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Product has been created successfully',
        data,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not created!',
        error: 'Bad Request'
      });
    }
  }

  @UseGuards(StaffGuard)
  @Put(':id')
  async updateProduct(
    @Res() response: any,
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    try {
      const data = await this.productService.updateProduct(productId, updateProductDto);
      return response.status(HttpStatus.OK).json({
        message: 'Product has been successfully updated',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getProducts(
    @Res() response: any
  ) {
    try {
      const data = await this.productService.getAllProducts( true );
      return response.status(HttpStatus.OK).json({
        message: 'All products data found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  async getProduct(
    @Res() response: any,
    @Param('id') id: string
  ) {
    try {
      const data = await this.productService.getProduct(id);
      return response.status(HttpStatus.OK).json({
        message: 'Product found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(StaffGuard)
  @Delete(':id')
  async deleteProduct(
    @Res() response: any,
    @Param('id') productId: string
  ) {
    try {
      const data = await this.productService.deleteProduct(productId);
      return response.status(HttpStatus.OK).json({
        message: 'Product deleted successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
