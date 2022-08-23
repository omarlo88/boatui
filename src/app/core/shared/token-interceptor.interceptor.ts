import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { TokenRefreshService } from './token-refresh.service';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  refresh = false;

  constructor(private tokenRefreshService: TokenRefreshService,
              private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isUrlRefreshToken = request.url.indexOf('/token') >= 0
    if (isUrlRefreshToken) {
      return next.handle(request);
    } else {
      const accessToken = this.authService.getAccessToken();
      const req = request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 403 && !this.refresh) {
          this.refresh = true;
          return this.tokenRefreshService.refreshToken().pipe(
            switchMap(({ accessToken, refreshToken }) => {
              this.authService.storeLoggedJWT(accessToken, refreshToken)
              return next.handle(request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                  }
                }
              ));
            })
          );
        }
        this.refresh = false;
        return throwError(() => err)
      }));
    }
  }
}
