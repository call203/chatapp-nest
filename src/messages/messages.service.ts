import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IMeesageService } from './message';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Message } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageParams } from 'src/utils/types';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class MessagesService implements IMeesageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}
  async createMessage({ user, content, conversationId }): Promise<Message> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: ['creator', 'recipient'],
    });

    if (!conversation)
      throw new HttpException('Conversation not found', HttpStatus.BAD_REQUEST);

    const { creator, recipient } = conversation;

    if (creator.id !== user.id && recipient.id !== user.id)
      throw new HttpException('Cannot Create Meswsage', HttpStatus.FORBIDDEN);

    const newMessage = this.messageRepository.create({
      content,
      conversation,
      author: instanceToPlain(user),
    });
    const savedMessage = await this.messageRepository.save(newMessage);
    conversation.lastMessageSent = savedMessage;
    await this.conversationRepository.save(conversation);
    return;
  }
  getMessagesByConversationId(conversationId: number): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['author'],
      where: { conversation: { id: conversationId } },
      order: { createdAt: 'DESC' },
    });
  }
}
