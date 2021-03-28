import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, finalize, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinnerSubject = new BehaviorSubject(false);
  loading$: Observable<boolean> = this.spinnerSubject.asObservable();

  spinUntilComplete<T>(observable$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => observable$),
      finalize(() => this.loadingOff())
    );
  }

  loadingOn(): void {
    this.spinnerSubject.next(true);
  }

  loadingOff(): void {
    this.spinnerSubject.next(false);
  }
}