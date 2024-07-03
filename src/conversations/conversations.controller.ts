import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constant';
import { IConversationService } from './conversations';
import { CreateConversationDto } from './dtos/CreateConversations.dto';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';

@Controller(Routes.CONVERSATIONS)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationService: IConversationService,
  ) {}

  @Post()
  async createConversation(
    @AuthUser() user: User,
    @Body() createConversationPayload: CreateConversationDto,
  ) {
    return this.conversationService.createConversation(
      user,
      createConversationPayload,
    );
  }
  @Get()
  async getConversations(@AuthUser() { id }: User) {
    return this.conversationService.getConversations(id);
  }
  @Get(':id')
  async getConversationById(@Param('id') id: number) {
    const conversation = await this.conversationService.findConversationById(
      id,
    );
    return conversation;
  }
}
