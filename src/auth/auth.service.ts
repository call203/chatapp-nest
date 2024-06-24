import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Services } from 'src/utils/constant';
import { IUserService } from 'src/users/user';
import { ValidateUserDetails } from 'src/utils/types';
import { compareHash } from 'src/utils/helpers';

@Injectable()
export class AuthService {
  constructor(@Inject(Services.USERS) private userSerivce: IUserService) {}

  async validateUser(userDetails: ValidateUserDetails) {
    const user = await this.userSerivce.findUser({ email: userDetails.email });
    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    return compareHash(userDetails.password, user.password);
  }
}
