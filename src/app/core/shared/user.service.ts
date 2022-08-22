import { Injectable } from '@angular/core';
import { GenericService } from '../../shared/api/generic.service';
import { User } from './model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User> {

  /**
   * Constructor of UserService.
   *
   * @param: http
   */
  constructor(http: HttpClient) {
    super(http, '/users');
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.url}/user-authenticated`);
  }
}
