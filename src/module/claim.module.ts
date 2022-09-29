import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClaimDoc, ClaimDocSchema } from '../schema/claim.schema';
import { ClaimService } from '../service/claim/service';
import { ClaimController } from '../controller/claim/controller';
import { ProductService } from '../service/product/service';
import { ProductDoc, ProductDocSchema } from '../schema/product.schema';
import { UserDoc, UserDocSchema } from '../schema/user.schema';
import { UserService } from '../service/user/service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ClaimDoc.name, schema: ClaimDocSchema }]),
    MongooseModule.forFeature([{ name: ProductDoc.name, schema: ProductDocSchema }]),
    MongooseModule.forFeature([{ name: UserDoc.name, schema: UserDocSchema }]),
  ],
  controllers: [ClaimController],
  providers: [ClaimService, ProductService, UserService],
  exports: [ClaimService],
})
export class ClaimModule {}
