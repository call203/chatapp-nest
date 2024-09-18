import { Request } from 'express';
import { Conversation, Friend, FriendRequest, Message, User } from './typeorm';

export type CreateUserDetails = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type ValidateUserDetails = {
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
}>;

export type CreateConversationParams = Partial<{
  authorId: number;
  email: string;
  message: string;
}>;

export type FindParticipantParams = Partial<{
  id: number;
}>;

export interface AutehnticatedRequest extends Request {
  user: User;
}

export type CreateParticipantParams = {
  id: number;
};

export type CreateMessageParams = {
  content: string;
  conversationId: number;
  user: User;
};

export type CreateMessageResponse = {
  message: Message;
  conversation: Conversation;
};

export interface AuthenticatedRequest extends Request {
  user: User;
  logout: (callback: (err: Error) => void) => void;
}

export type UpdateUserProfileParams = Partial<{
  about: string;
  image: Express.Multer.File;
}>;

export type FriendRequestStatus = 'accepted' | 'rejected' | 'pending';

export type FriendCreateParams = {
  user: User;
  email: string;
};

export type AcceptFriendRequestResponse = {
  friend: Friend;
  friendRequest: FriendRequest;
};

export type FriendAcceptParams = {
  id: number;
  userId: number;
};

export type FriendCancelParams = {
  id: number;
  userId: number;
};

export type FriendRejectParams = {
  id: number;
  userId: number;
};
