import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Message } from './Message';
import { Profile } from './Profile';
import { MessageLastRead } from './MessageLastRead';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  firstName: string;

  @Column({ unique: true })
  lastName: string;

  @Column({ unique: true })
  @Exclude()
  password: string;

  @OneToMany(() => Message, (message) => message.author)
  @JoinColumn()
  messages: Message[];

  @OneToOne(() => Profile, { cascade: ['insert', 'update'], eager: true })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => MessageLastRead, (MessageLastRead) => MessageLastRead.user)
  messageLastReads: MessageLastRead[];
}
