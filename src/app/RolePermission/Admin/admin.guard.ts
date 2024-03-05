import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  role: any = '';
  constructor(public user_service: ApiService, public router: Router) {
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.getToken() != undefined ? true : this.redirect();
  }

  redirect() {
    this.router.navigate(['/Login'])
    return true;
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
