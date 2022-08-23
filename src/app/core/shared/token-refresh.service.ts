import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { defaultLocale, GenericService } from '../../shared/api/generic.service';
import { LoginResponseData } from './model/login-response-data';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService extends GenericService<LoginResponseData> {

  /**
   * Constructor of TokenRefreshService.
   *
   * @param: http
   */
  constructor(http: HttpClient,
              private authService: AuthService) {
    super(http, '/token');
  }

  refreshToken(): Observable<any> {
    let headers = new HttpHeaders();
    const refreshToken = this.authService.getRefreshToken();
    headers = headers.set('Authorization', `Bearer ${refreshToken}`);
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept-Language', defaultLocale);
    console.log(this.getHeaders(headers))
    return this.http.get(this.url, {
      headers,
      observe: 'response'
    });
  }
}
