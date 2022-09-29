import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../service/user/service';
import { UpdateUserDto } from '../../dto/user/update.dto';
import { CustomerGuard } from '../../guard/customer.guard';
import { PasswordUserDto } from '../../dto/user/password.dto';
import { LocalAuthGuard } from '../../guard/local-auth';
import { StaffGuard } from '../../guard/staff.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    return await this.userService.signUp(email, password, false);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @Request() req: any
  ): any {
    return {
      User: req.user,
      msg: 'Customer logged in'
    };
  }

  @UseGuards(CustomerGuard)
  @Get('profile')
  profile(
    @Req() request : any) {
    const userId = request.user.userId;
    return this.userService.getUser(userId);
  }

  @UseGuards(CustomerGuard)
  @Put('/')
  async updateUser(
    @Req() request : any,
    @Res() response: any,
    @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      const userId = request.user.userId;
      const data = await this.userService.updateUser(userId, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(CustomerGuard)
  @Post(':id')
  async updatePassword(
    @Res() response: any,
    @Param('id') userId: string,
    @Body() passwordUserDto: PasswordUserDto
  ) {
    try {
      const data = await this.userService.updatePassword(userId, passwordUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(StaffGuard)
  @Get()
  async getCustomers(
    @Res() response: any
  ) {
    try {
      const data = await this.userService.getAllUsers(false);
      return response.status(HttpStatus.OK).json({
        message: 'All customers data found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(StaffGuard)
  @Delete(':id')
  async deleteCustomer(
    @Res() response: any,
    @Param('id') userId: string
  ) {
    try {
      const data = await this.userService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
