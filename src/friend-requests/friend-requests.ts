import { FriendRequest } from 'src/utils/typeorm';
import {
  FriendAcceptParams,
  FriendCancelParams,
  FriendCreateParams,
  FriendRejectParams,
} from 'src/utils/types';

export interface IFriendsRequestsService {
  create(params: FriendCreateParams);
  accept(params: FriendAcceptParams);
  cancel(params: FriendCancelParams);
  reject(params: FriendRejectParams);
  getFriendRequest(id: number): Promise<FriendRequest[]>;
}
