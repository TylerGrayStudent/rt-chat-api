import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chat } from './chat.model';

@Injectable()
export class ChatService {
  private _chats = new BehaviorSubject<Chat[]>([]);
  private _chatHistory: Chat[] = [];

  getChats(): Observable<Chat[]> {
    return this._chats.asObservable();
  }

  addChat(chat: Chat) {
    this._chatHistory.push(chat);
    this._chats.next([chat]);
  }
}
