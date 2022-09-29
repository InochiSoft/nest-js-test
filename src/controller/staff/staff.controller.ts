import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../../service/user/service';
import { UpdateUserDto } from '../../dto/user/update.dto';
import { LocalAuthGuard } from '../../guard/local-auth';
import { StaffGuard } from '../../guard/staff.guard';
import { PasswordUserDto } from '../../dto/user/password.dto';

@Controller('staff')
export class StaffController {
  constructor( private readonly userService: UserService ) { }

  @Post('signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    return await this.userService.signUp(email, password, true);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any): any {
    return {
      User: req.user,
      msg: 'Staff logged in'
    };
  }

  @UseGuards(StaffController)
  @Get('profile')
  profile(
    @Req() request : any) {
    const userId = request.user.userId;
    return this.userService.getUser(userId);
  }

  @UseGuards(StaffGuard)
  @Put(':id')
  async updateStaff(
    @Res() response: any,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      const data = await this.userService.updateUser(userId, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(StaffGuard)
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
  async getStaffs(
    @Res() response: any,
    @Request() req: any,
  ) {
    try {
      const data = await this.userService.getAllUsers(true);
      return response.status(HttpStatus.OK).json({
        message: 'All staffs data found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(StaffGuard)
  @Get(':id')
  async getStaff(
    @Res() response: any,
    @Param('id') userId: string
  ) {
    try {
      const data = await this.userService.getUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(StaffGuard)
  @Delete(':id')
  async deleteStaff(
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
