import { Injectable } from '@angular/core';
import { GenericService } from '../../shared/api/generic.service';
import { LoginResponseData } from '../../boats/boats/shared/model/login-response-data';
import { User } from '../../boats/boats/shared/model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User> {

  /**
   * Constructor of BoatsService.
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
