import { User } from 'src/utils/typeorm';
import { ValidateUserDetails } from 'src/utils/types';

export interface IAuthService {
  validateUser(validateUserDetail: ValidateUserDetails): Promise<User | null>;
}
