import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private apiService : ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let  currentUser : any;
    this.apiService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);

    if(currentUser!==null && currentUser!==undefined && currentUser.responseData!==undefined){
   // console.log(currentUser.responseData.token);
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${currentUser.responseData.token}`

        }
      })
    }
    return next.handle(request);
  }
}
