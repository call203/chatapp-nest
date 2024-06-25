import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Services } from 'src/utils/constant';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    SessionSerializer,
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
