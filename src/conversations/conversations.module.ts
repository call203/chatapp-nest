import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { Services } from 'src/utils/constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/utils/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation]), UsersModule],
  controllers: [ConversationsController],
  providers: [
    {
      provide: Services.CONVERSATIONS,
      useClass: ConversationsService,
    },
  ],
})
export class ConversationsModule {}
