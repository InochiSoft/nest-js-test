import { Document } from 'mongoose';

export interface IUserDoc extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly is_staff: boolean;
}
