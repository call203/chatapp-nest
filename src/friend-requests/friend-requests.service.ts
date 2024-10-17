import { Inject, Injectable } from '@nestjs/common';
import { IFriendsRequestsService } from './friend-requests';
import { FriendAcceptParams, FriendCreateParams } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend, FriendRequest } from 'src/utils/typeorm';
import { Services } from 'src/utils/constant';
import { IUserService } from 'src/users/interfaces/user';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound';
import { FriendRequestPendingException } from './exceptions/FriendRequestPending';
import { FriendRequestException } from './exceptions/FriendRequest';
import { IFreindsService } from 'src/friends/friends';
import { FriendAlreadyExistException } from 'src/friends/exceptions/FriendAlreadyExists';
import { FriendRequestNotFoundException } from './exceptions/FriendRequestNotFound';
import { FriendRequestAcceptedException } from './exceptions/FriendRequestAccepted';
import { Repository } from 'typeorm';

@Injectable()
export class FriendRequestsService implements IFriendsRequestsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
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

  async accept({ id, userId }: FriendAcceptParams) {
    const friendRequest = await this.findById(id);
    if (!friendRequest) throw new FriendRequestNotFoundException();
    if (friendRequest.status === 'accepted')
      throw new FriendRequestAcceptedException();
    if (friendRequest.receiver.id !== userId)
      throw new FriendRequestException();

    friendRequest.status = 'accepted';
    const updatedFriendRequest =
      await this.friendRequestRepository.save(friendRequest);
    const newFriend = this.friendRepository.create({
      receiver: friendRequest.receiver,
      sender: friendRequest.sender,
    });
    const friend = await this.friendRepository.save(newFriend);
    return { friend: friend, friendRequest: updatedFriendRequest };
  }

  async cancel({ id, userId }: FriendAcceptParams) {
    const friendRequest = await this.findById(id);
    if (!friendRequest) throw new FriendRequestNotFoundException();
    if (friendRequest.sender.id !== userId) throw new FriendRequestException();
    await this.friendRequestRepository.delete(id);
    return friendRequest;
  }

  async reject({ id, userId }: FriendAcceptParams) {
    const friendRequest = await this.findById(id);
    if (!friendRequest) throw new FriendRequestNotFoundException();
    if (friendRequest.receiver.id !== userId)
      throw new FriendRequestException();

    friendRequest.status = 'rejected';
    return this.friendRequestRepository.save(friendRequest);
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

  findById(id: number): Promise<FriendRequest> {
    return this.friendRequestRepository.findOne({
      where: { id },
      relations: ['receiver', 'sender'],
    });
  }
}
