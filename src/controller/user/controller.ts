import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from '../../service/user/service';
import { CreateUserDto } from '../../dto/user/create.dto';
import { UpdateUserDto } from '../../dto/user/update.dto';
import { StaffGuard } from '../../guard/staff.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(StaffGuard)
  @Get('profile')
  profile(
    @Req() request : any) {
    const userId = request.user.userId;
    return this.userService.getUser(userId);
  }

  @UseGuards(StaffGuard)
  @Post()
  async createUser(
    @Res() response: any,
    @Body() createUserDto: CreateUserDto
  ) {
    try {
      const data = await this.userService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        data,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request'
      });
    }
  }

  @UseGuards(StaffGuard)
  @Put(':id')
  async updateUser(
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
  @Get()
  async getUsers(
    @Res() response: any
  ) {
    try {
      const data = await this.userService.getAllUsers( true );
      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(StaffGuard)
  @Get(':id')
  async getUser(
    @Res() response: any,
    @Param('id') id: string
  ) {
    try {
      const data = await this.userService.getUser(id);
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
  async deleteUser(
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
