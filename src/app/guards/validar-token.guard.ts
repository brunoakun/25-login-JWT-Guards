import { AuthService } from './../auth/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate {

  constructor(
    private _authSrv: AuthService,
    private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    console.log('TokenGuard-> evaluando validarToken...')
    return (this._authSrv.validarToken())
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/auth/login');
          }
        })
      );
  }


}
