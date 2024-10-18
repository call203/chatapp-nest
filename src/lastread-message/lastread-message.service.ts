import { Injectable } from '@nestjs/common';
import { ILastReadMessageService } from './lastread-message';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageLastRead } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { LastReadMessageParams } from 'src/utils/types';

@Injectable()
export class LastreadMessageService implements ILastReadMessageService {
  constructor(
    @InjectRepository(MessageLastRead)
    private readonly messageLastReadRepository: Repository<MessageLastRead>,
  ) {}

  async updateLastReadMessage(params: LastReadMessageParams) {
    const exist = await this.messageLastReadRepository.findOne({
      where: {
        user: { id: params.user.id },
        conversation: { id: params.conversation.id },
      },
    });
    if (exist) {
      exist.lastMessage = params.message;
      await this.messageLastReadRepository.save(exist);
    } else {
      const newLastRead = this.messageLastReadRepository.create({
        user: params.user,
        conversation: params.conversation,
        lastMessage: params.message,
      });
      await this.messageLastReadRepository.save(newLastRead);
    }

    return;
  }
}
