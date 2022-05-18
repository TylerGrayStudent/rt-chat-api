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
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';

interface User {
  id: string;
  username?: string;
}

interface UserChangeEvent {
  type: 'add' | 'remove';
  user: User;
  users: User[];
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements NestGateway {
  @WebSocketServer()
  server: Server;

  private _users = new BehaviorSubject<User[]>([]);

  constructor(private chat: ChatService) {}

  afterInit(server: any) {
    // this.chat.getChats().subscribe((chats) => {
    //   server.emit('message', chats[0]);
    // });
    // this._users.subscribe((users) => {
    //   server.emit('users', users);
    // });
  }

  addUser(user: User) {
    // if (this._users.value.find((x) => x.username === user.username)) {
    //   console.log('User already exists');
    //   // throw new HttpException(`User ${user.username} already exists`, 409);
    // }
    // this._users.next([...this._users.getValue(), user]);
    // this.chat.addChat({
    //   message: `${user.username} joined the chat`,
    //   user: 'System',
    // });
  }

  removeUser(id: string) {
    // const username = this._users.value.find((x) => x.id === id)?.username;
    // this._users.next(this._users.getValue().filter((x) => x.id !== id));
    // this.chat.addChat({
    //   message: `${username} left the chat`,
    //   user: 'System',
    // });
  }

  handleConnection(socket: Socket) {
    console.log('Client connected');
    console.log(socket.handshake.auth);
    console.log(socket.id);
    socket.join(socket.id);
    //const name = socket.handshake.auth.username;
    //this.addUser({ id: socket.id, username: name });
  }

  handleDisconnect(socket: Socket) {
    //this.removeUser(socket.id);
    console.log('Client disconnected');
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('message')
  async onChat(
    @MessageBody() message: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const user = this._users.value.find((x) => x.id === socket.id);
    this.chat.addChat({ message: message, user: user.username });
  }

  @SubscribeMessage('events')
  onEvent(@ConnectedSocket() socket: Socket) {
    socket.emit('events', ['users', 'message']);
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('call')
  async call(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    //console.log('onCall', username);
    //const user = this._users.value.find((x) => x.username === username);
    //socket.broadcast.to(user.id).emit('call', socket.id);
    socket.broadcast.to(username).emit('call', { from: socket.id });
    //socket.to(username).emit('call', { from: socket.id });
  }
}
