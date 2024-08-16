import { Module } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequestsController } from './friend-requests.controller';
import { Services } from 'src/utils/constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from 'src/utils/typeorm';
import { FriendRequest } from 'src/utils/typeorm/entities/FriendRequest';

@Module({
  imports: [TypeOrmModule.forFeature([Friend, FriendRequest])],
  controllers: [FriendRequestsController],
  providers: [
    {
      provide: Services.FRIENDS_REQUEST_SERVICES,
      useClass: FriendRequestsService,
    },
  ],
})
export class FriendRequestsModule {}
