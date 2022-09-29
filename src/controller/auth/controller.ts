import { Controller, Post, Req, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from '../../service/auth/service';
import { LocalAuthGuard } from '../../guard/local-auth';
import { AuthenticatedGuard } from '../../guard/authenticated.guard';
import { StaffGuard } from '../../guard/staff.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: any,
  ) {
    return this.authService.loginCredentials(req.user);
  }

/*
  @Post('signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    return await this.authService.signUp(email, password);
  }
*/

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Request() req: any): string {
    return req.user;
  }

  @UseGuards(StaffGuard)
  @Get('staff')
  isStaffOnly(@Request() req: any): string {
    return req.user;
  }

  @Get('/logout')
  logout(@Request() req: any): any {
    req.session.destroy();
    return { msg: 'The user session has ended' }
  }
}
