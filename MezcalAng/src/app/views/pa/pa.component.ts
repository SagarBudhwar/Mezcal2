import { Component, OnInit } from '@angular/core';
import { FormGroup, Validator, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { invalid } from '@angular/compiler/src/render3/view/util';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';  

@Component({
  selector: 'app-pa',
  templateUrl: './pa.component.html',
  styleUrls: ['./pa.component.scss']
})

export class PaComponent implements OnInit {
  data: any;
  uid: any;
  href: any;
  messagePop:boolean = true;

  uri: any;
  Product: any;
  addfeedback: FormGroup;
  audio:boolean=true;
  playForm: FormGroup;
  feedbackMes: boolean = false;
  feedbackDiv: boolean = false;
  showGenuine: boolean = false;
  showFake: boolean = false;
  showDamage: boolean = false;
  showStolen: boolean = false;
  showImage: boolean = false;
  public lat:any;
  public lng:any;
  latitude: any='123.3'
  longitude: any = '32.6'
  verificationId: number = 0;
  //feedbackId : number = 0;
  ImageUrl: any;
  feedbackModal: boolean = false;
 
  rating: number = 0;
  feedbackForm: FormGroup;
  url: string;
  showUnMapped: boolean;
  

  
  constructor(private router: Router,private toastrService: ToastrService, private fb: FormBuilder, private _router: Router, private _route: ActivatedRoute, private api: ApiService, private confirmationService: ConfirmationService) {
    this.feedbackForm = this.fb.group({
      feedbackId: [0],
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      MobNo: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      UsrFeedback: ['', Validators.required],
      rating: ['']
    })
  }
  confirm(event: Event) {
    this.confirmationService.confirm({
        
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            //confirm action
        },
        reject: () => {
            //reject action
        }
    });
}
// displayclose(){
//   this.audio=false;
// }
getLocation() {
  debugger
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position: any) => {
      if (position) {
        console.log("Latitude: " + position.coords.latitude +
          "Longitude: " + position.coords.longitude);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(this.lat);
        console.log(this.lat);
      }
    },
      (error: any) => console.log(error));
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
  showDialog() {
    this.feedbackModal = true;
  }
  ngOnInit() {
    this.getLocation();
    this.uri = window.location.href;
    //this.href = this._router.url
    if (this._route.snapshot.queryParamMap.has("uid")) {
      this.uid = this._route.snapshot.queryParamMap.get("uid");

    }
    else {
      window.location.href = '/PageNotFound';
    }

    this.url = this.router.url

    if(this.uri.includes('https')){
      navigator.geolocation.getCurrentPosition(this.successCallback, this.errorCallBack)
    }
    this.sendProductAuthData(this.uri)
  }
  successCallback = (position: any) =>{
    this.latitude = position.coords.latitude
    this.longitude = position.coords.longitude
  }
  errorCallBack = (err: any) => {

  }
  get f() {
    return this.feedbackForm.controls;
  }
  sendProductAuthData(data: any) {
    let obj = { ...data };
    obj.UID = this.uri;
    obj.Usrlongitude = this.longitude
    obj.Usrlatitude = this.latitude
    obj.ScanFrom = 'Web'  
   

  

    this.api.postApi('ProductAuthentication/VerifyProduct', obj).subscribe((res: any) => {
debugger
      this.verificationId = res.responseData.verificationId;
      this.feedbackForm.patchValue({
        feedbackId: this.verificationId
      })

      if (res.responseCode == "200") {


        this.showGenuine = true;
        this.showImage = true;

        this.Product = res.responseMessage;
        this.ImageUrl = res.responseData.productImg;

        this.playAudio();

      }
      else if (res.responseCode == "400") {
        this.showFake = true;
        this.Product = res.responseMessage;
       // this.playAudioFake();
        //this.feedbackMes=false;

      }
      else if (res.responseCode == "401") {
        this.showDamage = true;
        this.Product = res.responseMessage;
        //this.feedbackMes=false;
        this.playAudioDamage();

      }

      else if (res.responseCode == "402") {
        this.showStolen = true;
        this.Product = res.responseMessage;
        //this.feedbackMes=false;
        this.playAudioStolen();

      }
      else if (res.responseCode == "403") {

        this.showUnMapped = true;

        this.Product = res.responseMessage;

        //this.feedbackMes=false;

        this.playAudioStolen();



      }
      else {
        if (this.Product === undefined) {

          window.location.href = '/PageNotFound';
        }
      }

    });
  }
  playAudio(){

    // let audio = new Audio('./../../../assets/voice/ProductGenuine.mp3');
    // audio.play();

    let audio = new Audio();
    audio.src =  "./assets/voice/ProductGenuine.mp3";
    audio.muted = true;
    audio.load();
  
    audio.play();

  }
  playAudioFake(){
    let audio = new Audio();
    audio.src =  "./assets/voice/alertaana.mp3";
    audio.muted = true;
    audio.load();
    audio.play();
  }
  playAudioDamage(){
    let audio = new Audio();
    audio.src =  "./assets/voice/damage.mp3";
    audio.load();
    
    audio.play();

  }
  playAudioStolen(){

    let audio = new Audio();
    audio.src =  "./assets/voice/stolen.mp3";
    audio.muted = true;
    audio.load();
    
    audio.play();

  }
  SaveFeedback() {

    if (this.feedbackForm.invalid) {
      return

    }
    if (this.feedbackForm.valid) {
      const obj = {
        feedbackId: this.feedbackForm.value.feedbackId,
        rating: (this.feedbackForm.value.rating).toString(),
        MobNo: this.feedbackForm.value.MobNo,
        Name: this.feedbackForm.value.Name,
        Email: this.feedbackForm.value.Email,
        UsrFeedback: this.feedbackForm.value.UsrFeedback


      }
      //this.rating= this.rating.toString()
      const form = { ... this.feedbackForm.value };

      //this.feedbackForm.append('feedbackId', this.verificationId.toString());

      this.api.postApi('ProductAuthentication/UpdateFeedback', obj).subscribe((res: any) => {


        if (res.responseCode == "200") {
          this.feedbackMes = false;
          this.feedbackForm.reset();
         this.feedbackModal=false;
          this.toastrService.success(res.responseMessage, 'exito!');

        }
      });


    }
  }
  feedbackMessage() {
    this.feedbackMes = true;
  }
}