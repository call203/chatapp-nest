import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthenticatedSocket } from 'src/utils/interfaces';
import { Session, User } from 'src/utils/typeorm';
import { DataSource } from 'typeorm';
import * as cookieParser from 'cookie-parser';
import * as cookie from 'cookie';
import { plainToInstance } from 'class-transformer';

export class WebsocketAdapter extends IoAdapter {
  private app: INestApplicationContext;
  private dataSource: DataSource;

  constructor(app: INestApplicationContext, dataSource: DataSource) {
    super(app);
    this.app = app;
    this.dataSource = dataSource;
  }
  createIOServer(port: number, options?: any) {
    const sessionRepository = this.dataSource.getRepository(Session);
    const server = super.createIOServer(port, options);

    server.use(async (socket: AuthenticatedSocket, next) => {
      console.log('Socket middleware');
      const { cookie: clientCookie } = socket.handshake.headers;
      if (!clientCookie) {
        return next(new Error('Not Authenticated. No cookie'));
      }

      const { CHAT_APP_SESSION_ID } = cookie.parse(clientCookie);
      if (!CHAT_APP_SESSION_ID) {
        console.log('CHAT_APP_SESSION_ID DOES NOT EXIST');
        return next(new Error('Not Authenticated'));
      }

      const signedCookie = cookieParser.signedCookie(
        CHAT_APP_SESSION_ID,
        process.env.COOKIE_SECRET,
      );

      if (!signedCookie) return next(new Error('Error signing cookie'));
      const sessionDB = await sessionRepository.findOne({
        where: { id: signedCookie },
      });
      const userDB = plainToInstance(
        User,
        JSON.parse(sessionDB.json).passport.user,
      );
      socket.user = userDB;
      next();
    });
    return server;
  }
}
