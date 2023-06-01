import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
  ){}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token') as string}`)
    })

   


    return next.handle(authReq)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Call your token refresh method
          return this.refreshTokenAndRetry(req, next);
        }
        return throwError(error);
      }),
      retry(1)
    )
  }

  private refreshTokenAndRetry(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService
    .updateAccessToken()
    .then((res) => {
      if(res)localStorage.setItem('access_token', res?.access_token)
    })
    .catch(() => {
      this.router.navigate(['admin', 'sign-in']);
      this.dialog.closeAll();
    })

    // Retry the failed request with the new token
    const updatedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    return next.handle(updatedRequest);
  }

}
