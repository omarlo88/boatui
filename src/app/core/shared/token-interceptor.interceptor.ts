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

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  static accessToken = '';
  static refreshToken = '';
  refresh = false;

  constructor(private tokenRefreshService: TokenRefreshService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${TokenInterceptorInterceptor.accessToken}`
      }
    });
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 403 && !this.refresh) {
        this.refresh = true;
        return this.tokenRefreshService.refreshToken(TokenInterceptorInterceptor.refreshToken).pipe(
          switchMap((data) => {
            TokenInterceptorInterceptor.accessToken = data.accessToken;
            return  next.handle(request.clone({
                setHeaders: {
                  Authorization: `Bearer ${TokenInterceptorInterceptor.accessToken}`
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
