import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateConversationParams } from 'src/utils/types';
import { IConversationService } from './conversations';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constant';
import { IUserService } from 'src/users/user';

@Injectable()
export class ConversationsService implements IConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepostitory: Repository<Conversation>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  async getConversations(id: number): Promise<Conversation[]> {
    return this.conversationRepostitory
      .createQueryBuilder('conversation')
      .leftJoin('conversation.creator', 'creator')
      .addSelect([
        'creator.id',
        'creator.firstName',
        'creator.lastName',
        'creator.email',
      ])
      .leftJoin('conversation.receipient', 'recipient')
      .addSelect([
        'recipient.id',
        'recipient.firstName',
        'recipient.lastName',
        'recipient.email',
      ])
      .where('creator.id = :id', { id })
      .orWhere('recipient.id = :id', { id })
      .orderBy('conversation.id', 'DESC')
      .getMany();
  }

  async createConversation(user: User, params: CreateConversationParams) {
    const { recipientId } = params;
    if (user.id === params.recipientId) {
      throw new HttpException(
        'Cannot Create Conversation',
        HttpStatus.BAD_REQUEST,
      );
    }
    const existingConversation = await this.conversationRepostitory.findOne({
      where: [
        { creator: { id: user.id }, recipient: { id: recipientId } },
        { creator: { id: recipientId }, recipient: { id: user.id } },
      ],
    });

    if (existingConversation)
      throw new HttpException('Conversation exists', HttpStatus.CONFLICT);
    const recipient = await this.userService.findUser({ id: recipientId });

    if (!recipient)
      throw new HttpException('Recipient not found', HttpStatus.BAD_REQUEST);

    const conversation = this.conversationRepostitory.create({
      creator: user,
      recipient: recipient,
    });

    return this.conversationRepostitory.save(conversation);
  }

  async findConversationById(id: number): Promise<Conversation> {
    return this.conversationRepostitory.findOne({ where: { id } });
  }
}
