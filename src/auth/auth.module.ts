import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Services } from 'src/utils/types';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: Services.AUTH,
    },
  ],
})
export class AuthModule {}
