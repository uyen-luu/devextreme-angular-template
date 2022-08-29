﻿import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '@app/shared/models';
import {environment} from '@environment';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/users`);
  }
}
