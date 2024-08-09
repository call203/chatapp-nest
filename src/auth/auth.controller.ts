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
import { IUserService } from 'src/users/interfaces/user';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { instanceToPlain } from 'class-transformer';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Gauard';
import { Response, Request } from 'express';
import { AuthenticatedRequest } from '../utils/types';
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
    return res.send(req['user']);
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  logout(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    req.logout((err) => {
      return err ? res.send(400) : res.send(200);
    });
  }
}
