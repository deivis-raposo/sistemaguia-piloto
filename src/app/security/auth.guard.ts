import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../_services/usuario.service';
import { SharedService } from '../_services/shared.service';


@Injectable()
export class AuthGuard implements CanActivate {

  public shared: SharedService;

  constructor(private userService: UsuarioService,
              private router: Router) {
                this.shared = SharedService.getInstance();
  }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(this.shared.isLoggedIn()){
        return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
