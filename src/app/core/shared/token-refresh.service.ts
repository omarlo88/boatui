import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../boats/boats/shared/model/user';
import { GenericService } from '../../shared/api/generic.service';
import { LoginResponseData } from '../../boats/boats/shared/model/login-response-data';

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
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${refreshToken}`);
    return this.http.get<LoginResponseData>(this.url, {headers});
  }
}
