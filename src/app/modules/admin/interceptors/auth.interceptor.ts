import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router
  ){}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    
    const authReq = req.clone({
      headers: req.headers.set('Authorization', localStorage.getItem('access_token') as string)
    })

    return this.router.url !== '/admin/sign-in' ? next.handle(authReq) : next.handle(req);
  }
}
