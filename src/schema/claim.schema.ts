import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { ProductDoc, ProductDocSchema } from './product.schema';
import { UserDoc, UserDocSchema } from './user.schema';
import * as mongoose from 'mongoose';

export type ClaimDocument = ClaimDoc & Document;

@Schema()
export class ClaimDoc {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserDoc.name })
  @Type(() => UserDoc)
  customer: UserDoc;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ProductDoc.name })
  @Type(() => ProductDoc)
  product: ProductDoc;

  @Prop()
  product_sn: string;

  @Prop()
  create_date: number;

  @Prop()
  is_approved: boolean;
}

export const ClaimDocSchema = SchemaFactory.createForClass(ClaimDoc);
