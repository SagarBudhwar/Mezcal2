import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import {Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import * as $ from 'jquery';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  userMenu:boolean = true;
  urlCheck:any;
  responsiveMenu:boolean = false;
  
  constructor(private renderer: Renderer2, private el: ElementRef, public router: Router, private _auth:AuthService, private _confirmationService: ConfirmationService) {    
    router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        this.renderer.removeClass(this.el.nativeElement, 'open');
      }
    }
    )
  }
  confirm() {
    this._confirmationService.confirm({
      message: 'estas seguro que quieres salir del sistema?',
        // message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this._auth.logout();
        }
    });
}
  ngOnInit() {   
    
    $(document).ready(function(){
      $('#nav-toggle-btn').click(function() {
        $('#left-panel').toggleClass('show-nav');
        $('body').toggleClass('open-nav');
      });
      $('#menuToggle').click(function(){        
        $('.test').toggleClass('open');
        $('.right-panel').toggleClass('resize');
      }); 
  
      $(document.body).on('click', '#left-panel li', function (e) { 
        e.preventDefault(); 
        $(this).siblings().children().removeClass('btn-toggle').next('.sub-menu').slideUp();  
        $(this).children().toggleClass('btn-toggle').next('.sub-menu').slideToggle();                 
      }); 
  
      $('.user-area').click(function() {
        $('.user-menu').slideToggle();
      });
      
      $(document).mouseup(function(e:any) {
      var container = $(".user-area");
      var slideMenu = $(".left-panel");
      var usermenu = $('.user-menu');
      var submenu = $('.sub-menu');
      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0) 
      {
        usermenu.slideUp();     
      }
      if (!slideMenu.is(e.target) && slideMenu.has(e.target).length === 0) 
      {
        submenu.slideUp();
        $('#left-panel li a').removeClass('btn-toggle');
      }
  });
    });
  }
  
 
  changePassword() {
    this.router.navigateByUrl('/changePassword');
    this.userMenu = true;
  }
}
