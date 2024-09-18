import { Module } from '@nestjs/common';
import { GatewayModule } from 'src/gateway/gateway.module';
import { FriendRequestsEvents } from './friend-requests.events';
import { MessagingGateway } from 'src/gateway/gateway';

@Module({
  imports: [GatewayModule],
  providers: [FriendRequestsEvents],
})
export class EventModule {}
