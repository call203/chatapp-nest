import { Friend } from 'src/utils/typeorm';

export interface IFreindsService {
  getFriends(id: number): Promise<Friend[]>;
  isFriends(userOneId: number, userTwoId: number): Promise<Friend | undefined>;
}
