import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StatusClaimDto {
  @IsBoolean()
  is_approved: boolean;
}
