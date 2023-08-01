import { Component } from '@angular/core';
import { User } from './models/loginUser';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  constructor(private apiService: ApiService){
     this.setCurrentUser();
  }

  setCurrentUser(){
    const user:User = JSON.parse(localStorage.getItem('user')|| '{}');
    this.apiService.setCurrentUser(user);
  }

 
  
}
