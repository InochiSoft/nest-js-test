import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

export type UserDocument = UserDoc & Document;

@Schema()
export class UserDoc {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop({
    required: true,
    unique: true
  })
  email: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop()
  is_staff: boolean;
}

export const UserDocSchema = SchemaFactory.createForClass(UserDoc);
