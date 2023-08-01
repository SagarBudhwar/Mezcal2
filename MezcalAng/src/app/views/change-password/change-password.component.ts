import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  ChangePassword: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private toastrService: ToastrService, private auth: AuthService) { }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.ChangePassword = this.fb.group({
      oldpassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      cnfrmNewPassword: ['', [Validators.required]],
      Password:[''],
      UserId: ['']
    });
  }
  clear()
  {
    this.ChangePassword.patchValue({
      oldpassword:'',
      newPassword:'',
      cnfrmNewPassword:''
    })
  }
  checkOldNewPassword():boolean
  {
       ;
    if(this.ChangePassword.controls.oldpassword.value===this.ChangePassword.controls.newPassword.value && this.ChangePassword.controls.oldpassword.value!=""&&this.ChangePassword.controls.newPassword.value!="" && this.ChangePassword.controls.oldpassword.value!=undefined && this.ChangePassword.controls.newPassword.value!=undefined)
    {
      return true;
    }
    return false;
  }
  checkPassword():boolean
  {
    //QHT-31 solved by adding the check for old and new password
    if(this.ChangePassword.get('newPassword')!.value===this.ChangePassword.get('cnfrmNewPassword')!.value)
    {
      return true;
    }
    return false;
  }
  //////////   Used for change password.
  submit() {
    if (this.ChangePassword.invalid) {
      return
    }
    if (this.ChangePassword.valid) {

      const form = { ...this.ChangePassword.value };
      form.UserId = localStorage.getItem('UserID');
      form.Password = this.ChangePassword.controls.cnfrmNewPassword.value

      this.apiService.postApi( 'User/ChangeLoginPassword',form).subscribe((resp: any) => {
        if (resp.responseCode == 200) {
          this.ChangePassword.reset();
          // this.toastrService.success('Success', 'Password has been changed please login again');
          this.toastrService.success('exito¡', 'la clave ha sido cambiada por favor ingresar');
          this.auth.logout();
        }
        else {
          this.toastrService.warning('', resp.responseMessage);
        }
      }, err => {
      //   this.toastrService.warning('Warning', err.error.ClientErrorMessage);
      this.toastrService.warning('cuidado¡', err.error.ClientErrorMessage);
      })

    }
  }
  get d() {
    return this.ChangePassword.controls;
  }
}
