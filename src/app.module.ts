import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import entities from './utils/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Session } from './utils/typeorm';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { GatewayModule } from './gateway/gateway.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FriendsModule } from './friends/friends.module';
import { FriendRequestsModule } from './friend-requests/friend-requests.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.development' }),
    PassportModule.register({ session: true }),
    AuthModule,
    UsersModule,
    ConversationsModule,
    MessagesModule,
    GatewayModule,
    FriendsModule,
    FriendRequestsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      synchronize: true,
      entities,
    }),
    TypeOrmModule.forFeature([Session]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
