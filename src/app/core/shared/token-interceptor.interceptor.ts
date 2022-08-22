import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  static accessToken = '';

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${TokenInterceptorInterceptor.accessToken}`
      }
    });
    return next.handle(req);
  }
}
