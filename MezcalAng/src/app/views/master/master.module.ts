import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRouteModule } from './master-route.module';
import { ProductMasterComponent } from './product-master/product-master.component';
import { SharedModule } from './../../shared/shared.module';
import { UserMasterComponent } from './user-master/user-master.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { CommonMasterComponent } from './common-master/common-master.component';
import { StateMasterComponent } from './state-master/state-master.component';
@NgModule({
  declarations: [
    ProductMasterComponent,
    UserMasterComponent,
    ProductCategoryComponent,
    RoleMasterComponent,
    CommonMasterComponent,
    StateMasterComponent,
    

  ],
  imports: [
    CommonModule,
    MasterRouteModule,
    SharedModule
  ]
})
export class MasterModule { }
