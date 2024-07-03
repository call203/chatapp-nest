import { User, Conversation } from 'src/utils/typeorm';
import { CreateConversationParams } from 'src/utils/types';

export interface IConversationService {
  createConversation(user: User, conversationParams: CreateConversationParams);
  getConversations(id: number): Promise<Conversation[]>;
  findConversationById(id: number): Promise<Conversation>;
}
