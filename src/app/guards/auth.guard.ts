import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/firebase/auth/auth.service';
import { MenuService } from '../services/menu/menu.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private menu: MenuService
  ) {}

  canActivate(): Promise<boolean> {
    if (!this.menu.menuStatus()) this.menu.menuControl(true);
    return new Promise((resolve) => {
      this.authService.getAuth().onAuthStateChanged((user) => {
        if (!user) {
          this.router.navigateByUrl('login');
        }
        resolve(user ? true : false);
      });
    });
  }
}
