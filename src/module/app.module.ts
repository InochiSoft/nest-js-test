import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from '../service/app/service';
import { AppController } from '../controller/app/controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { ProductModule } from './product.module';
import { ClaimModule } from './claim.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017',{ dbName: process.env.DB_NAME || 'tictag' }),
    UserModule,
    AuthModule,
    ProductModule,
    ClaimModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})

export class AppModule {}
