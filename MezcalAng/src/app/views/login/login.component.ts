import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/loginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  loginForm: FormGroup;
  ForgotPwdFrom: FormGroup;
  remember: boolean = false;
  UserName: string = "";
  Password: string = "";
  display:boolean=false;
  Model:any={};
  IsLogin:boolean=false;
  currentUser$ : Observable<User>;

  constructor(private fb: FormBuilder, private apiService: ApiService, private auth: AuthService, private toastrService: ToastrService, private router: Router) {

    this.loginForm = this.fb.group({
      UserName: [localStorage.getItem('UserNameSaved'), Validators.required],
      Password: [localStorage.getItem('passwordSaved'), Validators.required],
      remember: [localStorage.getItem('Remember')]
    })


    if(localStorage.getItem('Remember')=="" || localStorage.getItem('Remember')=="false"){

      this.loginForm.patchValue({
        remember:false
      })

    }



  }

  ngOnInit() {
    console.log(localStorage)
    this.ForgotPwdFrom = this.fb.group({
      Email: ['',Validators.required]
    })


      this.currentUser$ = this.apiService.currentUser$;

   // this.getCurrentUser();

  }

  get f() {
    return this.loginForm.controls
  }

  get u() {
    return this.ForgotPwdFrom.controls
  }
  ///  Used for Login User

  submitForm() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    else {

    if (JSON.parse(this.loginForm.controls.remember.value) === true) {
      localStorage.setItem('UserNameSaved', this.loginForm.controls.UserName.value);
      localStorage.setItem('passwordSaved', this.loginForm.controls.Password.value);
      localStorage.setItem('Remember', JSON.parse(this.loginForm.controls.remember.value));
    }
    else{
      localStorage.setItem('UserNameSaved', '');
      localStorage.setItem('passwordSaved','');
      localStorage.setItem('Remember', JSON.parse("false"));
    }
        //  var res=   this.apiService.login('Auth/Login', this.loginForm.value);

        //  if(res){
         // this.apiService.PostApiLogin('Auth/Login', this.loginForm.value)
        //  }

      this.apiService.login('Auth/Login', this.loginForm.value).subscribe((resp: any) => {

        if (resp.responseCode == 200) {
          console.log(console.log(resp))
          if (resp.responseData.accessType == 1 || resp.responseData.accessType == 3)  {
            localStorage.setItem('userName', this.loginForm.controls.UserName.value);
            localStorage.LoggedInUser = JSON.stringify(resp.responseData);
            localStorage.setItem('UserID', resp.responseData.userId)
            localStorage.token = resp.responseData.token;
            localStorage.refreshToken = resp.responseData.refreshToken;
            window.location.href = '/dashboard';

          }

          else {
            this.toastrService.error('Usuario no autorizado !! Comuníquese con el administrador.',"Error de inicio de sesion");
            // this.toastrService.error('Unauthorized User !! Please contact admin.',"Login Failed");

          }

        }
        else{
          this.toastrService.error(resp.responseMessage,"Error de inicio de sesion");
          // this.toastrService.error(resp.responseMessage,"Login Failed");
        }

      },
        (error) => {

          // this.toastrService.error('Server Error !!');
          this.toastrService.error('error de servidor  !!');
        })
      }

    return;

  }





  ShowforgotPassword() {

    this.display=true;
    // this.toastrService.info('', 'Please contact to admin...',
    //   {
    //     positionClass: 'toast-top-right'
    //   }
    // );
  }

  SendForgotPassword()
  {
    if (this.ForgotPwdFrom.invalid) {
      return;
    }

    // if (this.loginForm.controls.remember.value === true) {
    //   // localStorage.setItem('UserName', this.loginForm.controls.UserName.value);
    //   // localStorage.setItem('password', this.loginForm.controls.password.value);
    // }
    else {
      
      this.apiService.PostApiLogin('User/ForgotPasswordWeb', this.ForgotPwdFrom.value).subscribe((resp: any) => {

        if (resp.responseCode == "200") {

            this.toastrService.success(resp.responseMessage,"Éxito");  // Success
            this.display=false
        }
        else{
          this.toastrService.warning(resp.responseMessage,"Advertencia"); //  Warning
        }

      },
        (error) => {
         // this.toastrService.error('Server Error !!');
         this.toastrService.error('error de servidor  !!');
        })
  }

}



//  getCurrentUser(){
//     this.apiService.currentUser$.subscribe(user=>{
//
//
//
//       this.IsLogin =!!user;
//     },error=>{
//       console.error(error);
//     }
//     )
//   }

}





