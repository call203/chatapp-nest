import { Injectable } from '@nestjs/common';
import { AuthenticatedSocket } from 'src/utils/interfaces';

export interface IGatewaySessionManager {
  getUserSocket(id: number);
  setUserSocket(userId: number, socket: AuthenticatedSocket): void;
  removeUserSocket(userId: number): void;
  getSockets(): Map<number, AuthenticatedSocket>;
}

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
  private readonly sessions: Map<number, AuthenticatedSocket> = new Map();

  getUserSocket(id: number) {
    return this.sessions.get(id);
  }
  setUserSocket(userId: number, socket: AuthenticatedSocket) {
    this.sessions.set(userId, socket);
  }
  removeUserSocket(userId: number) {
    this.sessions.delete(userId);
  }
  getSockets(): Map<number, AuthenticatedSocket> {
    return this.sessions;
  }
}
