import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})


export class UserRoleGuard implements CanActivate {
  userRolePageList :any[]=[];

  constructor(private auth: AuthService,private _toastr:ToastrService,
    private myRoute: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,)//: Observable<boolean> | Promise<boolean> | boolean
     {
      debugger
      const user =  JSON.parse(localStorage.getItem('user') || '{}');
      
   
      if (user && !route.data ) {
        return true;
      }
      else{

      this.userRolePageList= user.responseDataRolePages;

     //var a=  this.userRolePageList.find(x=>x.pageId==route.data.pageId)
    // if (user && route.data && route.data.pageId && user.data.roles.includes(user.roleId)) {
      debugger
    if (user && route.data && route.data.pageId && this.userRolePageList.find(x=>x.pageId==route.data.pageId)) {
      return true;
    } else {
      this._toastr.warning('Sorry !! you do not have permission to access this page.','OK');
      window.location.href = '/dashboard';
       return false
    }
  }

  }
}
