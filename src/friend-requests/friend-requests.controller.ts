import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { Routes, Services } from 'src/utils/constant';
import { IFriendsRequestsService } from './friend-requests';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { CreateFriendDto } from './dtos/CreateFriend.dto';

@Controller(Routes.FRIENDS_REQUEST)
export class FriendRequestsController {
  constructor(
    @Inject(Services.FRIENDS_REQUEST_SERVICES)
    private readonly friendsRequestService: IFriendsRequestsService,
  ) {}

  @Get()
  getFriendRequest(@AuthUser() user: User) {
    return this.friendsRequestService.getFriendRequest(user.id);
  }

  @Post()
  async createFriendRequest(
    @AuthUser() user: User,
    @Body() { email }: CreateFriendDto,
  ) {
    const params = { user, email };
    await this.friendsRequestService.create(params);
    return;
  }
}
