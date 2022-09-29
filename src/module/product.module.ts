import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductDoc, ProductDocSchema } from '../schema/product.schema';
import { ProductController } from '../controller/product/controller';
import { ProductService } from '../service/product/service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductDoc.name, schema: ProductDocSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
