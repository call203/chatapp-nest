import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Services } from 'src/utils/constant';
import { IGatewaySessionManager } from './gateway.session';
import { AuthenticatedSocket } from 'src/utils/interfaces';
import { Conversation } from 'src/utils/typeorm';
import { CreateMessageResponse } from 'src/utils/types';
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class MessagingGateway implements OnGatewayConnection {
  constructor(
    @Inject(Services.GATEWAY_SESSION_MANAGER)
    readonly sessions: IGatewaySessionManager,
  ) {}
  @WebSocketServer()
  server: Server;

  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    this.sessions.setUserSocket(socket?.user?.id, socket);
    console.log('Connected to ' + socket.user.id);
    socket.emit('connected', {});
  }

  @SubscribeMessage('onConversationJoin')
  onConversationJoin(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.join(data.conversationId);
    client.to(data.conversationId).emit('userJoin');
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('Create Message');
  }

  @SubscribeMessage('onConversationLeave')
  onConversationLeave(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.leave(data.conversationId);
    client.to(data.conversationId).emit('userLeave');
  }

  @OnEvent('conversation.create')
  handleConversationCreateEvent(payload: Conversation) {
    const recipientSocket = this.sessions.getUserSocket(payload.recipient.id);

    console.log('Conversation Session Created');
    if (recipientSocket) recipientSocket.emit('onConversation', payload);
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: CreateMessageResponse) {
    const {
      author,
      conversation: { creator, recipient },
    } = payload.message;

    const authorSocket = this.sessions.getUserSocket(author.id);
    const recipientSocket =
      author.id === creator.id
        ? this.sessions.getUserSocket(recipient.id)
        : this.sessions.getUserSocket(creator.id);

    if (authorSocket) authorSocket.emit('onMessage', payload);
    if (recipientSocket) recipientSocket.emit('onMessage', payload);
  }
}
