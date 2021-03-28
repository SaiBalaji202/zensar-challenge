import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from './messages.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'zensar-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  showMessages = false;
  messages$: Observable<string[]>;
  close = faTimes;

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.messages$ = this.messagesService.messages$.pipe(
      tap(() => (this.showMessages = true))
    );
  }

  onClose(): void {
    this.showMessages = false;
  }
}
