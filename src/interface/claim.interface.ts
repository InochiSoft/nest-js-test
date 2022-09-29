import { Document } from 'mongoose';
import { IProductDoc } from './product.interface';
import { IUserDoc } from './user.interface';

export interface IClaimDoc extends Document {
  readonly customer: IUserDoc;
  readonly product: IProductDoc;
  readonly product_sn: string;
  readonly create_date: number;
  readonly is_approved: boolean;
}
