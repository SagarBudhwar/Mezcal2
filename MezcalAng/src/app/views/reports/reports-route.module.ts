import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VerificationReportComponent } from './verification-report/verification-report.component';
import { RatingReportComponent } from './rating-report/rating-report.component';
import { ProductMappingReportComponent } from './mapping-report/mapping-report.component';
import { ProductDeMappingReportComponent } from './de-mapping-report/de-mapping-report.component';
import { DamageReportComponent } from './damage-report/damage-report.component';
import { StolenReportComponent } from './stolen-report/stolen-report.component';
import { UserRoleGuard } from 'src/app/auth/userRoleGuard';
const routes: Routes = [
 {
    path: 'verification-report', component: VerificationReportComponent,data:{pageId:13},canActivate:[UserRoleGuard]
  },
  {
    path: 'product-mapping-report', component: ProductMappingReportComponent,data:{pageId:14},canActivate:[UserRoleGuard]
  },
  {
    path: 'product-demapping-report', component: ProductDeMappingReportComponent,data:{pageId:15},canActivate:[UserRoleGuard]
  },
  {
    path: 'damage-report', component: DamageReportComponent,data:{pageId:16},canActivate:[UserRoleGuard]
  }, 
  {
    path: 'stolen-report', component: StolenReportComponent,data:{pageId:17},canActivate:[UserRoleGuard]
  },
  {
    path: 'rating-report', component: RatingReportComponent,data:{pageId:18},canActivate:[UserRoleGuard]
  }
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
export class ReportsRouteModule { }
