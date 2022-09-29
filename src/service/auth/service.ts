import { Injectable } from '@nestjs/common';
import { UserService } from '../user/service';
import { IUserDoc } from '../../interface/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtTokenService: JwtService
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<any> {
    const user: IUserDoc = await this.userService.getByEmail( email );
    const match = await bcrypt.compare(password, user.password);
    return match ? user : undefined;
  }

  async loginCredentials(user: any) {
    const payload = { email: user.email, name: user.name, password: user.password, is_staff: user.is_staff };
    return {
      access_token: this.jwtTokenService.sign(payload),
      ...payload
    };
  }
}
