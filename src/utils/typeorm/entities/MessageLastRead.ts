import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Conversation } from './Conversation';
import { Message } from './Message';

@Entity({ name: 'message_last_read' })
export class MessageLastRead {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.messageLastReads)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @ManyToOne(
    () => Conversation,
    (conversation) => conversation.messageLastReads,
  )
  @JoinColumn()
  conversation: Conversation;

  @Column()
  conversationId: number;

  @ManyToOne(() => Message, (message) => message.id)
  @JoinColumn()
  lastMessage: Message;

  @Column()
  lastMessageId: number;
}
