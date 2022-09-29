import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClaimDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsString()
  @IsNotEmpty()
  product_sn: string;

  @IsNumber()
  @IsNotEmpty()
  create_date: number;

  @IsBoolean()
  is_approved: boolean;
}
