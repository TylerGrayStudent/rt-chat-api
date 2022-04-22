import { Req } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Request } from 'express';
import { Server } from 'http';
import { from, map, Observable } from 'rxjs';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  async handleConnection(@Req() request: Request): Promise<void> {
    console.log('Client connected');
    this.server.emit('identity', 'connected');
  }

  @SubscribeMessage('connection')
  onConnect() {
    console.log('Client connected');
  }

  @SubscribeMessage('event')
  finalAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number) {
    this.server.emit('identity', data);
  }
}
