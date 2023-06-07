import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SnackbarConfigService } from '@modules/share/services/common/snackbar-config.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackbarConfigService: SnackbarConfigService
  ){}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isAuthenticated()){
      return true;
    }
    else{
      this.router.navigate(['admin', 'sign-in']);
      this.snackbarConfigService.openSnackBar(`Incorrect data`);
      return false;
    }
      
  }
  
}
