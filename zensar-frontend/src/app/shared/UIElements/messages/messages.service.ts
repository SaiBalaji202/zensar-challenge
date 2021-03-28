import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messagesSubject = new BehaviorSubject<string[]>([]);
  messages$: Observable<string[]> = this.messagesSubject
    .asObservable()
    .pipe(filter((messages) => messages?.length > 0));

  showMessages(...err: string[]): void {
    this.messagesSubject.next(err);
  }
}
