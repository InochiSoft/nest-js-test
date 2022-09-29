import { Module } from '@nestjs/common';
import { UserService } from '../service/user/service';
import { UserController } from '../controller/user/controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDoc, UserDocSchema } from '../schema/user.schema';
import { StaffController } from '../controller/staff/staff.controller';
import { CustomerController } from '../controller/customer/controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDoc.name, schema: UserDocSchema }]),
  ],
  controllers: [UserController, StaffController, CustomerController],
  providers: [UserService],
  exports: [UserService],
})

export class UserModule {}
