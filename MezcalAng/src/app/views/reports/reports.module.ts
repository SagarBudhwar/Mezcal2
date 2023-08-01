import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportsRouteModule} from './reports-route.module';
import { VerificationReportComponent } from './verification-report/verification-report.component';
import { SharedModule } from './../../shared/shared.module';
import { RatingReportComponent } from './rating-report/rating-report.component';
import { ProductMappingReportComponent } from './mapping-report/mapping-report.component';
import { ProductDeMappingReportComponent } from './de-mapping-report/de-mapping-report.component';
import { DamageReportComponent } from './damage-report/damage-report.component';
import { StolenReportComponent } from './stolen-report/stolen-report.component';
@NgModule({
  declarations: [
    VerificationReportComponent,
    RatingReportComponent,
    ProductMappingReportComponent,
    ProductDeMappingReportComponent,
    DamageReportComponent,
    StolenReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRouteModule,
    SharedModule
  ]
})
export class ReportsModule { }
