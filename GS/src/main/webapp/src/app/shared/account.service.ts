import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from './user.model';


@Injectable({ providedIn: 'root' })
export class AccountService {

  private userUrl = 'http://localhost:8080/user';
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username, password) {
    return this.http.post<User>(this.userUrl + '/authenticate', [ username, password ])
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

   logout() {
     // remove user from local storage and set current user to null
     sessionStorage.removeItem('user');
     this.userSubject.next(null);
     this.router.navigate(['']);
  }

  register(user: User) {
    return this.http.post(this.userUrl + '/register', user);
  }

}
