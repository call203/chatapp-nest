import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagingGateway } from 'src/gateway/gateway';
import { FriendRequest } from 'src/utils/typeorm';
import { AcceptFriendRequestResponse } from '../utils/types';

@Injectable()
export class FriendRequestsEvents {
  constructor(private readonly gateway: MessagingGateway) {}

  @OnEvent('friendrequest.create')
  friendRequestCreate(payload: FriendRequest) {
    const receiverSocket = this.gateway.sessions.getUserSocket(
      payload.receiver.id,
    );
    receiverSocket && receiverSocket.emit('onFriendRequestReceived', payload);
  }

  @OnEvent('friendrequest.cancel')
  handleFriendRequestCancel(payload: FriendRequest) {
    const receiverSocket = this.gateway.sessions.getUserSocket(
      payload.receiver.id,
    );
    receiverSocket && receiverSocket.emit('onFriendRequestCancelled', payload);
  }

  @OnEvent('friendrequest.accpet')
  handleFriendRequestAccepted(payload: AcceptFriendRequestResponse) {
    const senderSocket = this.gateway.sessions.getUserSocket(
      payload.friendRequest.sender.id,
    );

    senderSocket && senderSocket.emit('onFriendRequestAccepted', payload);
  }

  @OnEvent('friendrequest.reject')
  handleFriendRequestJected(payload: FriendRequest) {
    const senderSocket = this.gateway.sessions.getUserSocket(payload.sender.id);

    senderSocket && senderSocket.emit('onFriendRequestRejected', payload);
  }
}
