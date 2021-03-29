import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { UserProfile } from '../models/profile.model';
import { SpinnerService } from './../../shared/UIElements/spinner/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  private usersSubject = new BehaviorSubject<UserProfile[]>([]);
  users$ = this.usersSubject.asObservable();
  URL = environment.api.url + '/user';

  constructor(private http: HttpClient, private loading: SpinnerService) {
    this.fetchUserProfiles()?.subscribe();
  }

  private fetchUserProfiles(): Observable<UserProfile[]> {
    const users$ = this.http.get<UserProfile[]>(this.URL).pipe(
      tap((users) => {
        console.log(users);
        this.usersSubject.next(users);
      }),
      shareReplay()
    );
    return this.loading.spinUntilComplete(users$);
  }

  public getUserById(userId: string): UserProfile {
    return this.usersSubject.getValue()?.find((user) => user._id === userId);
  }

  public updateUser(userId: string, name: string, image: string) {
    const userFormData = new FormData();
    userFormData.append('name', name);
    userFormData.append('image', image);

    const updateUser$ = this.http
      .post<UserProfile>(this.URL + userId, userFormData)
      .pipe(
        tap((user) => {
          const users = this.usersSubject.getValue();
          const idx = users?.findIndex((user) => user._id === userId);
          if (idx && idx !== -1) {
            users[idx] = { ...user };
            this.usersSubject.next(users);
          }
        })
      );
    return this.loading.spinUntilComplete(updateUser$);
  }

  public addUser(name: string, image: Blob) {
    const userFormData = new FormData();
    userFormData.append('name', name);
    userFormData.append('image', image);

    const pushUser$ = this.http.post<UserProfile>(this.URL, userFormData).pipe(
      tap((user) => {
        const users = this.usersSubject.getValue();
        users.push(user);
        this.usersSubject.next(users);
      })
    );
    return this.loading.spinUntilComplete(pushUser$);
  }

  public deleteUser(userId: string) {
    const users = this.usersSubject
      .getValue()
      ?.filter((user) => user._id !== userId);
    this.usersSubject.next(users);
  }
}
