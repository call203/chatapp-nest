import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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

  @OneToOne(() => Conversation)
  @JoinColumn()
  conversation: Conversation;

  @ManyToOne(() => Message, (message) => message.id)
  @JoinColumn()
  lastMessage: Message;
}
