import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUserService } from '../../users/interfaces/user';
import { User } from '../../utils/typeorm';
import { Services } from 'src/utils/constant';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {
    super();
  }

  //Set User info into Session
  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  //Get User into from Session
  async deserializeUser(user: User, done: Function) {
    const userDb = await this.userService.findUser({ id: user.id });

    return userDb ? done(null, userDb) : done(null, null);
  }
}
