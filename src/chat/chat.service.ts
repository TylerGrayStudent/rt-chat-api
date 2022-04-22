import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chat } from './chat.model';

@Injectable()
export class ChatService {
  private _chats = new BehaviorSubject<Chat[]>([]);

  getChats(): Observable<Chat[]> {
    return this._chats.asObservable();
  }

  addChat(chat: Chat) {
    this._chats.next([...this._chats.getValue(), chat]);
  }
}
