import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type ProductDocument = ProductDoc & Document;

@Schema()
export class ProductDoc {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  brand: string;

  @Prop()
  description: string;
}

export const ProductDocSchema = SchemaFactory.createForClass(ProductDoc);
