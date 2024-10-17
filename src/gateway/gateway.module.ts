import { Module } from '@nestjs/common';
import { MessagingGateway } from './gateway';
import { Services } from 'src/utils/constant';
import { GatewaySessionManager } from './gateway.session';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { LastreadMessageModule } from 'src/lastread-message/lastread-message.module';

@Module({
  imports: [ConversationsModule, LastreadMessageModule],
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
