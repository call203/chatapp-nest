import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Hi, there!' })
  about?: string;

  @Column({ nullable: true })
  image?: string;

  @OneToOne(() => User)
  user: User;
}
