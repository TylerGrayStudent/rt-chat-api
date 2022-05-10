import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { FriendsModule } from './Friends/friends.module';
import { UsersModule } from './Users/users.module';

@Module({
  imports: [
    ChatModule,
    UsersModule,
    FriendsModule,
    MongooseModule.forRoot(
      'mongodb+srv://RTChatAppAdmin:8DnXZZHRpxnt0amr@rtchatdb.vuslq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
