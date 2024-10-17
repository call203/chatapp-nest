import { LastReadMessageParams } from 'src/utils/types';

export interface ILastReadMessageService {
  updateLastReadMessage(params: LastReadMessageParams);
}
