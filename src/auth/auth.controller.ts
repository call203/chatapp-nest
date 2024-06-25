import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constant';
import { IAuthService } from './auth';
import { IUserService } from 'src/users/user';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { instanceToPlain } from 'class-transformer';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Gauard';
import { Response, Request } from 'express';
@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Res() res: Response) {
    return res.send(HttpStatus.OK);
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request, @Res() res: Response) {
    console.log(req);
    res.send(req);
  }

  @Post('logout')
  logout() {}
}
