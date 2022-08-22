import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../shared/api/generic.service';
import { BehaviorSubject, EMPTY, Observable, switchMap } from 'rxjs';
import { LoginResponseData } from './model/login-response-data';
import { User } from './model/user';
import { UserService } from './user.service';
import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends GenericService<LoginResponseData> {

  private currentUserProfile: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  authenticated = false;

  /**
   * Constructor of BoatsService.
   *
   * @param: http
   */
  constructor(http: HttpClient, private userService: UserService) {
    super(http, '/login');
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  login({ username, password }): Observable<User> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post<LoginResponseData>(this.url, formData).pipe(
      switchMap((data: LoginResponseData) => {
        const { accessToken, refreshToken } = data;
        if (accessToken && refreshToken) {
          this.authenticated = true;
          TokenInterceptorInterceptor.accessToken = accessToken;
          TokenInterceptorInterceptor.refreshToken = refreshToken;
          return this.userService.getCurrentUser();
        }
        return EMPTY;
      })
    );
  }

  logout(): void {
    // TODO send the request to logout
    this.authenticated = false;
    this.next(null);
    TokenInterceptorInterceptor.accessToken = '';
    TokenInterceptorInterceptor.refreshToken = '';
  }

  next(user: User): void {
    this.currentUserProfile.next(user);
  }

  getCurrentUserProfileEvent(): Observable<User> {
    return this.currentUserProfile.asObservable();
  }
}
