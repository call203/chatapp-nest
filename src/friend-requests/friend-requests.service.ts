import { Injectable } from '@nestjs/common';
import { IFriendsRequestsService } from './friend-requests';
import {
  FriendRejectParams,
  FriendAcceptParams,
  FriendCancelParams,
} from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequest } from 'src/utils/typeorm';

@Injectable()
export class FriendRequestsService implements IFriendsRequestsService {
  constructor(
    @InjectRepository(FriendRequest) private readonly friendRequestRepository,
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

  create(params: FriendRejectParams) {
    throw new Error('Method not implemented.');
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
}
