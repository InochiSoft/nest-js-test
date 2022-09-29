import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { IProductDoc } from '../../interface/product.interface';
import { CreateProductDto } from '../../dto/product/create.dto';
import { UpdateProductDto } from '../../dto/product/update.dto';
import { ProductDoc } from '../../schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductDoc.name)
    private productModel:Model<IProductDoc>
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<IProductDoc> {
    const data = await new this.productModel(createProductDto);
    return data.save();
  }

  async updateProduct(ProductId: string, updateProductDto: UpdateProductDto): Promise<IProductDoc> {
    const data = await this.productModel.findByIdAndUpdate(ProductId, updateProductDto, { new: true });
    if (!data) {
      throw new NotFoundException(`Product #${ProductId} not found`);
    }
    return data;
  }

  async getAllProducts(is_staff: boolean): Promise<IProductDoc[]> {
    const data = await this.productModel.find( { is_staff } );
    if (!data || data.length == 0) {
      throw new NotFoundException('Products data not found!');
    }
    return data;
  }

  async getProduct(ProductId: string): Promise<IProductDoc> {
    const data = await this.productModel.findById(ProductId).exec();
    if (!data) {
      throw new NotFoundException(`Product #${ProductId} not found`);
    }
    return data;
  }

  async deleteProduct(ProductId: string): Promise<IProductDoc> {
    const data = await this.productModel.findByIdAndDelete(ProductId);
    if (!data) {
      throw new NotFoundException(`Product #${ProductId} not found`);
    }
    return data;
  }
}
