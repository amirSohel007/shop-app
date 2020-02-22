import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {DataShareService} from './services/data-share.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(
     private datashare : DataShareService,
     private router : Router
   ){}
  canActivate() : boolean {
    if (this.datashare.isLoggedIn()){
      return true
    }
    else {
      this.router.navigate(['./register'])
      return false
    }
  }
}
