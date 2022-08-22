import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../shared/api/generic.service';
import { BehaviorSubject, EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { LoginResponseData } from '../../boats/boats/shared/model/login-response-data';
import { User } from '../../boats/boats/shared/model/user';
import { UserService } from './user.service';
import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends GenericService<LoginResponseData> {

  private currentUserProfile: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  /**
   * Constructor of BoatsService.
   *
   * @param: http
   */
  constructor(http: HttpClient, private userService: UserService) {
    super(http, '/login');
  }

  login({username, password}): Observable<User> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post<LoginResponseData>(this.url, formData).pipe(
      switchMap((data: LoginResponseData) => {
        const {accessToken, refleshToken} = data;
        if (accessToken && refleshToken) {
          TokenInterceptorInterceptor.accessToken = accessToken;
          return this.userService.getCurrentUser();
        }
        return EMPTY;
      })
    );
  }

  next(user: User): void {
    this.currentUserProfile.next(user);
  }

  getCurrentUserProfileEvent(): Observable<User> {
    return this.currentUserProfile.asObservable();
  }
}
