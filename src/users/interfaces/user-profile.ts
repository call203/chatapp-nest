import { User } from 'src/utils/typeorm';
import { UpdateUserProfileDto } from '../dtos/UpdateUserProfile.dto';

export interface IUserProfile {
  createProfile();
  updateProfile(user: User, params: UpdateUserProfileDto);
}
