import { Conversation } from './entities/Conversation';
import { FriendRequest } from './entities/FriendRequest';
import { Friend } from './entities/Friends';
import { Message } from './entities/Message';
import { Profile } from './entities/Profile';
import { Session } from './entities/Session';
import { User } from './entities/User';

const entities = [
  User,
  Session,
  Conversation,
  Message,
  Profile,
  Friend,
  FriendRequest,
];

export { User, Session, Conversation, Message, Profile, Friend, FriendRequest };
export default entities;
