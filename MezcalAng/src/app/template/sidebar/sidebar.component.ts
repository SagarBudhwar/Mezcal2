import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  name?: string;
  url?: string;
  icon?: string;
  hashLink = 'href="#"';
  routerlinks = 'routerLink="{{nav.url}}"';
  getNav: any[];
  masterNav: any[];
  activityNav: any[];
  reportNav: any[];
  sideBarNav: any[] = [];
  roleId: any;

  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 90;
  }

  // sideBarNav = [
  //   {
  //     url: 'dashboard',
  //     name: 'Dashboard',
  //     icon: 'fa fa-dashboard'
  //   },
  //   {name: 'Master',
  //   icon: 'fa fa-users',
  //   children: [
  //     {
  //       name: 'User Master',
  //       url: 'master/user-master'
  //     },
  //     {
  //       name: 'Product Master',
  //       url: 'master/product-master'
  //     },
  //     {
  //       name: 'Common Master',
  //       url: 'master/common-master'
  //     }
  //    ,
  //     {
  //       name: 'Role Master',
  //       url: 'master/role-master'
  //     }
  //   ]
  //   },
  //   {
  //     name: 'Transaction',
  //     icon: 'fa fa-credit-card',
  //     children: [
  //       {
  //         name: 'Hologram Stock',
  //         url: 'transaction/hologram-stock'
  //       },
  //       {
  //          name: 'Available Stock',
  //          url: 'transaction/available-stock'
  //        },
  //       {
  //         name: 'Product Mapping',
  //         url: 'transaction/product-mapping'
  //       },
  //       {
  //         name: 'Product De-mapping',
  //         url: 'transaction/product-de-mapping'
  //       },
  //       {
  //         name: 'Product Damage',
  //         url: 'transaction/product-damage'
  //       },
  //       {
  //         name: 'Generate Random No.',
  //         url: 'transaction/generate-random-no'
  //       }

  //     ]
  //   },
  //   {
  //     name: 'Report',
  //     icon: 'fa fa-bar-chart',
  //     children: [
  //       {
  //         name: 'Verification Report',
  //         url: 'reports/verification-report'
  //       },
  //       {
  //         name: 'Product Mapping Report',
  //         url: 'reports/product-mapping-report'
  //       },
  //       {
  //         name: 'Product De-mapping Report',
  //         url: 'reports/product-demapping-report'
  //       },
  //       {
  //         name: 'Rating Report',
  //         url: 'reports/rating-report'
  //       },
  //       {
  //         name: 'Damage Report',
  //         url: 'reports/damage-report'
  //       }
  //     ]
  //   },

  // ];

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }


  ngOnInit() {
    this.roleId = this.authService.getUserData().roleId;
    this.getNavData();
  }

  getNavData() {
  
    this.apiService.getApi('Role/GetPagesForUser/' + this.roleId).subscribe(
      (response: any) => {
        this.sideBarNav = response;
        this.sideBarNav.unshift({
          url: '/dashboard',
          name: 'Panel',
          icon: 'fa fa-dashboard',
        });
      },
      (error) => {
      
        this.router.navigateByUrl('/login');
      }
    );
  }
}
