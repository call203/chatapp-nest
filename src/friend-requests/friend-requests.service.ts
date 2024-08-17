import { Inject, Injectable } from '@nestjs/common';
import { IFriendsRequestsService } from './friend-requests';
import {
  FriendRejectParams,
  FriendAcceptParams,
  FriendCancelParams,
  FriendCreateParams,
} from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequest } from 'src/utils/typeorm';
import { Services } from 'src/utils/constant';
import { IUserService } from 'src/users/interfaces/user';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound';
import { FriendRequestPendingException } from './exceptions/FriendRequestPending';
import { FriendRequestException } from './exceptions/FriendRequest';
import { IFreindsService } from 'src/friends/friends';
import { FriendAlreadyExistException } from 'src/friends/exceptions/FriendAlreadyExists';

@Injectable()
export class FriendRequestsService implements IFriendsRequestsService {
  constructor(
    @InjectRepository(FriendRequest) private readonly friendRequestRepository,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
    @Inject(Services.FRIENDS_SERVICES)
    private readonly friendService: IFreindsService,
  ) {}

  getFriendRequest(id: number): Promise<FriendRequest[]> {
    const status = 'pending';
    return this.friendRequestRepository.find({
      where: [
        { sender: { id }, status },
        { receiver: { id }, status },
      ],
      relations: ['receiver', 'sender'],
    });
  }

  async create({ user: sender, email }: FriendCreateParams) {
    const receiver = await this.userService.findUser({ email });
    if (!receiver) throw new UserNotFoundException();
    const exists = await this.isPending(sender.id, receiver.id);
    if (exists) throw new FriendRequestPendingException();
    if (receiver.id === sender.id) {
      throw new FriendRequestException('Cannot Add yourself');
    }
    const isFriends = await this.friendService.isFriends(
      sender.id,
      receiver.id,
    );
    if (isFriends) throw new FriendAlreadyExistException();

    const friend = this.friendRequestRepository.create({
      sender,
      receiver,
      status: 'pending',
    });
    return this.friendRequestRepository.save(friend);
  }
  accept(params: FriendAcceptParams) {
    throw new Error('Method not implemented.');
  }
  cancel(params: FriendCancelParams) {
    throw new Error('Method not implemented.');
  }
  reject(params: FriendRejectParams) {
    throw new Error('Method not implemented.');
  }

  isPending(userOneId: number, userTwoId: number) {
    return this.friendRequestRepository.findOne({
      where: [
        {
          sender: { id: userOneId },
          receiver: { id: userTwoId },
          status: 'pending',
        },
        {
          sender: { id: userTwoId },
          receiver: { id: userOneId },
          status: 'pending',
        },
      ],
    });
  }
}
