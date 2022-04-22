import { Module } from '@nestjs/common';
import { ChatGateway } from './chat';

@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway],
})
export class ChatModule {}
