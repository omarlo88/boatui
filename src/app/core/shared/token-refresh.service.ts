import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { defaultLocale, GenericService } from '../../shared/api/generic.service';
import { LoginResponseData } from './model/login-response-data';

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService extends GenericService<LoginResponseData> {

  /**
   * Constructor of TokenRefreshService.
   *
   * @param: http
   */
  constructor(http: HttpClient) {
    super(http, '/token');
  }

  refreshToken(refreshToken: string): Observable<LoginResponseData> {

    /* let header = new HttpHeaders();

     header.append('Content-Type', 'application/json');
     header.append('Accept-Language', defaultLocale);
     header.append('Accept', 'application/json');
     header.append('Authorization', `Bearer ${refreshToken}`);
     header.append('Origin','http://localhost:4200');
     */
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${refreshToken}`);
    headers = headers.set('Content-Type', 'application/json');
    headers.set('Accept-Language', defaultLocale);
    // headers.append('Access-Control-Allow-Origin','*')
    return this.http.get<LoginResponseData>(this.url, { headers, withCredentials: true });
  }
}
