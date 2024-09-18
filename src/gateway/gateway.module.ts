import { Module } from '@nestjs/common';
import { MessagingGateway } from './gateway';
import { Services } from 'src/utils/constant';
import { GatewaySessionManager } from './gateway.session';
import { ConversationsModule } from 'src/conversations/conversations.module';

@Module({
  imports: [ConversationsModule],
  providers: [
    MessagingGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
  exports: [MessagingGateway],
})
export class GatewayModule {}
