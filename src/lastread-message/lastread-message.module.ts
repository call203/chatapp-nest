import { Module } from '@nestjs/common';
import { LastreadMessageService } from './lastread-message.service';
import { Services } from 'src/utils/constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageLastRead } from 'src/utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MessageLastRead])],
  providers: [
    { provide: Services.LASTREAD_MESSAGE, useClass: LastreadMessageService },
  ],
  exports: [
    { provide: Services.LASTREAD_MESSAGE, useClass: LastreadMessageService },
  ],
})
export class LastreadMessageModule {}
