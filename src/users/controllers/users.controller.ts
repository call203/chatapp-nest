import { Controller } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constant';

@Controller(Routes.USERS)
export class UsersController {
  constructor() {}
}
