import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constant';
import { IMeesageService } from './message';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { CreateMessageDto } from './dtos/CreateMessage.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ParseIntPipe } from '@nestjs/common';

@Controller(Routes.MESSAGES)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGES) private readonly messageService: IMeesageService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createMessage(
    @AuthUser() user: User,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    const msg = await this.messageService.createMessage({
      ...createMessageDto,
      user,
    });

    this.eventEmitter.emit('message.create', {
      message: msg,
      conversation: msg.conversation,
    });

    return;
  }
  @Get(':conversationId')
  async getMessagesFromConversation(
    @AuthUser() user: User,
    @Param('conversationId', ParseIntPipe) conversationId: number,
  ) {
    const messages =
      await this.messageService.getMessagesByConversationId(conversationId);

    return { conversationId, messages };
  }
}
