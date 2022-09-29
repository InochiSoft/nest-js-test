import { IsString } from 'class-validator';

export class PasswordUserDto {
  @IsString()
  password: string;
}
