import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Profile, User } from 'src/utils/typeorm';
import { UpdateUserProfileParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly httpService: HttpService,
  ) {}

  async getImgeLink(file: Express.Multer.File) {
    try {
      const formData = new FormData();
      formData.append('image', file.buffer.toString('base64'));
      const { data } = await firstValueFrom(
        this.httpService
          .post(
            `https://api.imgbb.com/1/upload?expiration=600&key=52b240069ac7e51df93d0e1de36360de`,
            formData,
          )
          .pipe(
            catchError((error: AxiosError) => {
              throw error;
            }),
          ),
      );
      return data.data.display_url;
    } catch (err) {
      throw new HttpException('Image Server Error', HttpStatus.CONFLICT);
    }
  }

  async updateProfile(user: User, params: UpdateUserProfileParams) {
    if (params.image) {
      user.profile.image = await this.getImgeLink(params.image);
    }
    if (params.about) {
      user.profile.about = params.about;
    }
    return this.userRepository.save(user);
  }

  async updateAndSaveProfile(user: User, params: UpdateUserProfileParams) {
    return this.updateProfile(user, params);
  }
}
