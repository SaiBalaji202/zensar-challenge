import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorInterceptorProvider } from './_interceptors/error.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ErrorInterceptorProvider],
})
export class CoreModule {}
