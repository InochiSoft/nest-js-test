import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth/service';
import { AuthController } from '../controller/auth/controller';
import { UserModule } from './user.module';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { LocalStrategy } from '../strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SessionSerializer } from "../guard/session.serializer"

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET || 'QUNDRVNT',
      signOptions: {expiresIn: process.env.JWT_EXPIRE || '1d'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, SessionSerializer],
})

export class AuthModule {}
