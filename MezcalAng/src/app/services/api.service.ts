import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from, of, ReplaySubject } from 'rxjs';
import { LoginResponse, User } from '../models/loginUser';
import{map} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: any;
  baseurl :string;
  LoginResponse:LoginResponse;
  user:any;
  videos:any;
  
  public currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient:HttpClient, private toastrService: ToastrService) {
    this.baseurl = environment.baseUrl;
    this.token = sessionStorage.getItem('token');
   }

   PostApiLogin(val: string,body: any) {
     
    return this.httpClient.post(`${this.baseurl}` + val, body);
  }

  postApi(val:any,requestBody:any){
    return this.httpClient.post(`${this.baseurl}` + val, requestBody);
  }

  getApi(val:any){
    return this.httpClient.get(`${this.baseurl}`+val);
  }
  reverseGeoCode(lat: number, long: number) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=22&addressdetails=1`);
  }
  locationService(lat: number, long: number,test: string){

    // return this.httpClient.get<any>();
    window.location.href,`https://maps.google.com/maps?q=loc:${lat},${long},${test}`
  }




  
login(Url: string,body: any){
  
  return this.httpClient.post<User>(this.baseurl+ Url,body).pipe(
    map((resp:User)=>{
      const user = resp;
      
      if(user.responseCode==200){
      if (resp.responseData.accessType == 1 || resp.responseData.accessType == 3)  {
        this.setCurrentUser(user);
      
      }
    } 
   
      return user;
    }, (error:any) => {
      console.log(error);
      this.toastrService.error('Server Error !!');
    })
  );
}

setCurrentUser(user:User){
  
  localStorage.setItem('user',JSON.stringify(user));
  this.currentUserSource.next(user);
}

}
