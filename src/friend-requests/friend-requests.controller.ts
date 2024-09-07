import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Patch(':id/accept')
  async acceptedFriendRequest(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const res = await this.friendsRequestService.accept({ id, userId });
    return res;
  }

  @Delete(':id/cancel')
  async cancelFriendRequest(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const res = await this.friendsRequestService.cancel({ id, userId });
    return res;
  }

  @Patch(':id/reject')
  async rejectFriendRequest(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const res = await this.friendsRequestService.reject({ id, userId });
    return res;
  }
}
