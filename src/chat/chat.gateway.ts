import { Bind } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Server } from 'http';
import { ChatService } from './chat.service';

interface User {
  id: string;
  username: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements NestGateway {
  @WebSocketServer()
  server: Server;

  public users: User[] = [];

  constructor(private chat: ChatService) {
    console.log('ChatGateway');
  }

  afterInit(server: any) {
    this.chat.getChats().subscribe((chats) => {
      server.emit('message', chats);
    });
  }

  handleConnection(socket: any) {
    console.log(`Client connected: ${socket.id}`);
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('connection')
  onConnect(@MessageBody() name: string, @ConnectedSocket() socket: any) {
    if (this.users.find((x) => x.username === name)) {
      socket.emit('error', 'Username already taken');
      return;
    }
    console.log(`User connected: ${name}`);

    this.users.push({ id: socket.id, username: name });
    this.chat.addChat({ message: `${name} joined the chat`, user: socket.id });
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('message')
  async onChat(@MessageBody() message: string, @ConnectedSocket() socket: any) {
    const user = this.users.find((x) => x.id === socket.id);
    this.chat.addChat({ message: message, user: user.username });
  }
}