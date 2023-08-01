import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { GenerateRandomNoComponent } from './generate-random-no/generate-random-no.component';
import { MappingComponent } from './mapping/mapping.component';
import { DemappingComponent } from './de-mapping/de-mapping.component';
import { ProductDamageComponent } from './damage/damage.component';
import { HologramStockComponent } from './hologram-stock/hologram-stock.component';
import { AvailableStockComponent } from './available-stock/available-stock.component';
import { UserRoleGuard } from 'src/app/auth/userRoleGuard';

const routes: Routes = [
  {path:'hologram-stock', component: HologramStockComponent,data:{pageId:8},canActivate:[UserRoleGuard]},
  {path:'available-stock', component: AvailableStockComponent,data:{pageId:9},canActivate:[UserRoleGuard]},
  {path:'product-mapping', component: MappingComponent,data:{pageId:10},canActivate:[UserRoleGuard]},
  {path:'product-de-mapping', component: DemappingComponent,data:{pageId:11},canActivate:[UserRoleGuard]},
  {path:'generate-random-no', component: GenerateRandomNoComponent,data:{pageId:12},canActivate:[UserRoleGuard]},
  {path:'product-damage', component: ProductDamageComponent},

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
export class TransactionRouteModule { }
