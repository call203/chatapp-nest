import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile, User } from 'src/utils/typeorm';
import { Services } from 'src/utils/constant';
import { UsersProfilesService } from './services/user-profile.service';
import { UserProfilesController } from './controllers/user-profile.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), HttpModule],
  controllers: [UsersController, UserProfilesController],
  providers: [
    {
      provide: Services.USERS,
      useClass: UsersService,
    },
    {
      provide: Services.USERS_PROFILES,
      useClass: UsersProfilesService,
    },
  ],
  exports: [
    {
      provide: Services.USERS,
      useClass: UsersService,
    },
    {
      provide: Services.USERS_PROFILES,
      useClass: UsersProfilesService,
    },
  ],
})
export class UsersModule {}
