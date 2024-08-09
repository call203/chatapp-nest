import {
  Body,
  Controller,
  Inject,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constant';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { IUserProfile } from '../interfaces/user-profile';
import { UpdateUserProfileDto } from '../dtos/UpdateUserProfile.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller(Routes.USERS_PROFILES)
export class UserProfilesController {
  constructor(
    @Inject(Services.USERS_PROFILES)
    private readonly userProfileService: IUserProfile,
  ) {}

  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  async updatePRofile(
    @AuthUser() user: User,
    @UploadedFile() file: Express.Multer.File,
    @Body() params: UpdateUserProfileDto,
  ) {
    if (file) {
      params.image = file;
    }

    return this.userProfileService.updateProfile(user, params);
  }
}
