import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/helpers';
import { Profile, User } from 'src/utils/typeorm';
import { CreateUserDetails, FindUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  async createUser(userDetails: CreateUserDetails) {
    const existngUser = await this.userRepository.findOneBy({
      email: userDetails.email,
    });
    if (existngUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    const password = await hashPassword(userDetails.password);

    const newProfile = this.profileRepository.create();
    const newUser = this.userRepository.create({
      ...userDetails,
      password,
      profile: newProfile,
    });
    return this.userRepository.save(newUser);
  }

  async findUser(findUserParams: FindUserParams): Promise<User> {
    return this.userRepository.findOne({
      where: findUserParams,
    });
  }
}
