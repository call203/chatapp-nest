import { Conversation } from './entities/Conversation';
import { Message } from './entities/Message';
import { Profile } from './entities/Profile';
import { Session } from './entities/Session';
import { User } from './entities/User';

const entities = [User, Session, Conversation, Message, Profile];

export { User, Session, Conversation, Message, Profile };
export default entities;
