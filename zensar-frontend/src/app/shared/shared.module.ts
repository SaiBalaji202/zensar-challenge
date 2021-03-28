import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './UIElements/messages/messages.component';
import { SpinnerComponent } from './UIElements/spinner/spinner.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [MessagesComponent, SpinnerComponent, SafeUrlPipe],
  imports: [CommonModule],
  exports: [MessagesComponent, SpinnerComponent, SafeUrlPipe],
})
export class SharedModule {}
