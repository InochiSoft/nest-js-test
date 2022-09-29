import { Controller, Get, HttpStatus, Res, Logger, Post, Body } from '@nestjs/common';
import { UserService } from '../../service/user/service';

@Controller('')
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    return await this.userService.signUp(email, password, false);
  }

  @Get()
  getWelcome(
    @Res() response: any
  ): string {
    Logger.log('response', response);
    return response.status(HttpStatus.OK).json({
      message: 'Welcome',
    });
  }
}
