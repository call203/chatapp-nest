import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUserService } from '../../users/user';
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
    console.log(user);
    console.log('SerializeUser');
    done(null, user);
  }

  //Get User into from Session
  async deserializeUser(user: User, done: Function) {
    console.log('DeserializeUser');
    console.log(user);
    const userDb = await this.userService.findUser({ id: user.id });
    console.log(userDb);
    return userDb ? done(null, userDb) : done(null, null);
  }
}
