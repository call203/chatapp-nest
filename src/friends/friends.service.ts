import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { IFreindsService } from './friends';

@Injectable()
export class FriendsService implements IFreindsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,
  ) {}

  getFriends(id: number): Promise<Friend[]> {
    return this.friendsRepository.find({
      where: [{ sender: { id } }, { receiver: { id } }],
      relations: ['sender', 'receiver'],
    });
  }

  isFriends(userOneId: number, userTwoId: number): Promise<Friend | undefined> {
    return this.friendsRepository.findOne({
      where: [
        {
          sender: { id: userOneId },
          receiver: { id: userTwoId },
        },
        {
          sender: { id: userTwoId },
          receiver: { id: userOneId },
        },
      ],
    });
  }
}
