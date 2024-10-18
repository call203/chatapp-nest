import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateConversationParams } from 'src/utils/types';
import { IConversationService } from './conversations';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constant';
import { IUserService } from 'src/users/interfaces/user';

@Injectable()
export class ConversationsService implements IConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  async getConversations(id: number): Promise<Conversation[]> {
    return this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.lastMessageSent', 'lastMessageSent')
      .leftJoinAndSelect('conversation.messageLastReads', 'messageLastReads')
      .addSelect([
        'messageLastReads.id',
        'messageLastReads.conversationId',
        'messageLastReads.lastMessageId',
      ])
      .leftJoin('conversation.creator', 'creator')
      .addSelect([
        'creator.id',
        'creator.firstName',
        'creator.lastName',
        'creator.email',
        'creator.profile',
      ])
      .leftJoinAndSelect('creator.profile', 'creatorProfile')
      .leftJoin('conversation.recipient', 'recipient')
      .addSelect([
        'recipient.id',
        'recipient.firstName',
        'recipient.lastName',
        'recipient.email',
        'recipient.profile',
      ])
      .leftJoinAndSelect('recipient.profile', 'recipientProfile')
      .where('creator.id = :id', { id })
      .orWhere('recipient.id = :id', { id })
      .getMany();
  }

  async createConversation(user: User, params: CreateConversationParams) {
    const { email } = params;

    const recipient = await this.userService.findUser({ email });

    if (!recipient)
      throw new HttpException('Recipient not found', HttpStatus.BAD_REQUEST);

    if (user.id === recipient.id) {
      throw new HttpException(
        'Cannot Create Conversation',
        HttpStatus.BAD_REQUEST,
      );
    }
    const existingConversation = await this.conversationRepository.findOne({
      where: [
        { creator: { id: user.id }, recipient: { id: recipient.id } },
        { creator: { id: recipient.id }, recipient: { id: user.id } },
      ],
    });

    if (existingConversation)
      throw new HttpException('Conversation exists', HttpStatus.CONFLICT);

    const conversation = this.conversationRepository.create({
      creator: user,
      recipient: recipient,
    });

    return this.conversationRepository.save(conversation);
  }

  async findConversationById(id: number): Promise<Conversation> {
    return this.conversationRepository.findOne({
      where: { id },
      relations: ['messages', 'lastMessageSent'],
    });
  }
}
