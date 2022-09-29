import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDoc } from 'src/schema/user.schema';
import { IUserDoc } from 'src/interface/user.interface';
import { CreateUserDto } from 'src/dto/user/create.dto';
import { UpdateUserDto } from 'src/dto/user/update.dto';
import * as bcrypt from 'bcrypt';
import { PasswordUserDto } from '../../dto/user/password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserDoc.name)
    private userModel:Model<IUserDoc>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUserDoc> {
    const data = await new this.userModel(createUserDto);
    return data.save();
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUserDoc> {
    const data = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    if (!data) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return data;
  }

  async getAllUsers(is_staff: boolean): Promise<IUserDoc[]> {
    const data = await this.userModel.find( { is_staff } );
    if (!data || data.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return data;
  }

  async getByEmail(email: string): Promise<IUserDoc> {
    const data = await this.userModel.findOne( { email } ).exec();
    if (!data) {
      throw new NotFoundException('User data not found!');
    }
    return data;
  }

  async getUser(userId: string): Promise<IUserDoc> {
    const data = await this.userModel.findById(userId).exec();
    if (!data) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return data;
  }

  async deleteUser(userId: string): Promise<IUserDoc> {
    const data = await this.userModel.findByIdAndDelete(userId);
    if (!data) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return data;
  }

  async signUp(
    email: string, password: string, is_staff: boolean
  ): Promise<IUserDoc> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const createUserDto = new CreateUserDto();
    createUserDto.name = '';
    createUserDto.password = hashedPassword;
    createUserDto.email = email;
    createUserDto.is_staff = is_staff;
    return await this.createUser(createUserDto);
  }

  async updatePassword(userId: string, passwordUserDto: PasswordUserDto): Promise<IUserDoc> {
    const data = await this.userModel.findByIdAndUpdate(userId, passwordUserDto, { new: false });
    if (!data) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return data;
  }

}
