import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {ProductMasterComponent} from './product-master/product-master.component';
import {UserMasterComponent} from './user-master/user-master.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { CommonMasterComponent } from './common-master/common-master.component';
import { UserRoleGuard } from 'src/app/auth/userRoleGuard';
import { ProductCategoryComponent } from './product-category/product-category.component';

const routes: Routes = [
  
  {
    path: 'user-master', component: UserMasterComponent,data:{pageId:4},canActivate:[UserRoleGuard]
  },
  {
    path: 'product-master', component: ProductMasterComponent,data:{pageId:5},canActivate:[UserRoleGuard]
  },
  {
    path: 'common-master', component: CommonMasterComponent,data:{pageId:6},canActivate:[UserRoleGuard]
  },
  {
    path: 'role-master', component: RoleMasterComponent,data:{pageId:7},canActivate:[UserRoleGuard]
  }, 
  {
    path: 'product-category-master', component: ProductCategoryComponent
  },
]

@NgModule({ 
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MasterRouteModule { }
