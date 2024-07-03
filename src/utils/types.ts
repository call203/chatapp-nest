import { User } from './typeorm';

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
  recipientId: number;
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
