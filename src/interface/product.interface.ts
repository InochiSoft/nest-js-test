import { Document } from 'mongoose';

export interface IProductDoc extends Document {
  readonly name: string;
  readonly brand: string;
  readonly description: string;
}
