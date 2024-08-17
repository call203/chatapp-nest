import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendAlreadyExistException extends HttpException {
  constructor(msg?: string) {
    super('Friend already exists', HttpStatus.CONFLICT);
  }
}
