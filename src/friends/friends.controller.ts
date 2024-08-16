import { Controller, Get, Inject } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { Routes, Services } from 'src/utils/constant';
import { IFreindsService } from './friends';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';

@Controller(Routes.FRIENDS)
export class FriendsController {
  constructor(
    @Inject(Services.FRIENDS_SERVICES)
    private readonly friendsService: IFreindsService,
  ) {}

  @Get()
  getFriends(@AuthUser() user: User) {
    return this.friendsService.getFriends(user.id);
  }
}
