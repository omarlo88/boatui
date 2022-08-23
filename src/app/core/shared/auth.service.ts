import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../shared/api/generic.service';
import { BehaviorSubject, EMPTY, Observable, switchMap } from 'rxjs';
import { LoginResponseData } from './model/login-response-data';
import { User } from './model/user';
import { UserService } from './user.service';

const ACCESS_TOKEN: string = 'access_token';
const REFRESH_TOKEN: string = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends GenericService<LoginResponseData> {

  private currentUserProfile: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private accessToken: string = null;
  private refreshToken: string = null;

  /**
   * Constructor of BoatsService.
   *
   * @param: http
   */
  constructor(http: HttpClient, private userService: UserService) {
    super(http, '/login');
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return token !== null && token !== undefined;
  }

  storeLoggedJWT(accessToken?: string, refreshToken?: string) {
    window.sessionStorage.setItem(ACCESS_TOKEN, accessToken);
    window.sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  private retrieveAccessToken() {
    return window.sessionStorage.getItem(ACCESS_TOKEN);
  }

  private retrieveRefreshToken() {
    return window.sessionStorage.getItem(REFRESH_TOKEN);
  }

  getAccessToken(): string {
    if (this.accessToken == null) {
      return this.retrieveAccessToken();
    }
    return this.accessToken;
  }

  getRefreshToken(): string {
    if (this.refreshToken == null) {
      return this.retrieveRefreshToken();
    }
    return this.refreshToken;
  }

  login({ username, password }): Observable<User> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post<LoginResponseData>(this.url, formData).pipe(
      switchMap((data: LoginResponseData) => {
        const { accessToken, refreshToken } = data;
        if (accessToken && refreshToken) {
          this.accessToken = accessToken;
          this.refreshToken = refreshToken;
          this.storeLoggedJWT(accessToken, refreshToken)
          return this.userService.getCurrentUser();
        }
        return EMPTY;
      })
    );
  }

  logout(): void {
    // TODO send the request to logout
    this.next(null);
    this.accessToken = null;
    this.refreshToken = null;
    window.sessionStorage.removeItem(ACCESS_TOKEN);
    window.sessionStorage.removeItem(REFRESH_TOKEN);
  }

  next(user: User): void {
    this.currentUserProfile.next(user);
  }

  getCurrentUserProfileEvent(): Observable<User> {
    return this.currentUserProfile.asObservable();
  }
}
