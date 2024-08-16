import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { Services } from 'src/utils/constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from 'src/utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Friend])],
  controllers: [FriendsController],
  providers: [
    {
      provide: Services.FRIENDS_SERVICES,
      useClass: FriendsService,
    },
  ],
  exports: [
    {
      provide: Services.FRIENDS_SERVICES,
      useClass: FriendsService,
    },
  ],
})
export class FriendsModule {}
