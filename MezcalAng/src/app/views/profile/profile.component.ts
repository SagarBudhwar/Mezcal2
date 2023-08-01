import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'src/app/models/user-master';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  Id: any;
  userDetails: UserProfile = new UserProfile();
  IsUserProfileData: boolean = true;

  constructor(private _Activatedroute: ActivatedRoute,private apiService: ApiService) {


  }

  ngOnInit() {
   // this.Id = this._Activatedroute.snapshot.paramMap.get('userId');
   this.Id = localStorage.getItem('UserID');
    if (this.Id != null || this.Id != '' || this.Id != undefined) {
      this.GetUserProfile(this.Id);
    }
  }

  GetUserProfile(userId: any) {

    if (Number(userId)  > 0) {
      this.apiService.getApi('User/GetUserProfileById?userId=' + userId).subscribe((response: any) => {
           ;
        if (response.responseCode == 200) {

          if(response.responseData !== null && response.responseData !== undefined){
            this.IsUserProfileData = true;
            //this.userDetails = response.responseData;
            this.userDetails.UserName = response.responseData.userName;
            this.userDetails.Email = response.responseData.email;
            this.userDetails.Mobile = response.responseData.mobile;
            this.userDetails.UserType = response.responseData.userType;

          }
        }else{
          this.IsUserProfileData = false;
        }
      });
    }

  }


}
