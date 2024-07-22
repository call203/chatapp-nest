import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { DataSource } from 'typeorm';
import { TypeormStore } from 'connect-typeorm';
import { Session } from './utils/typeorm/entities/Session';
import { WebsocketAdapter } from './gateway/gateway.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  const sessionRepository = dataSource.getRepository(Session);
  const adapter = new WebsocketAdapter(app, dataSource);
  app.setGlobalPrefix('api');
  app.useWebSocketAdapter(adapter);
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  const { PORT, COOKIE_SECRET } = process.env;
  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      name: 'CHAT_APP_SESSION_ID',
      cookie: {
        maxAge: 3600000 * 24,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  try {
    await app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
