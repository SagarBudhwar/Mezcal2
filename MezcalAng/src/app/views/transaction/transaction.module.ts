import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateRandomNoComponent } from './generate-random-no/generate-random-no.component';
import { SharedModule } from '../../shared/shared.module';
import { TransactionRouteModule } from './transaction-route.module';
import { MappingComponent } from './mapping/mapping.component';
import { DemappingComponent } from './de-mapping/de-mapping.component';
import { ProductDamageComponent } from './damage/damage.component';
import { HologramStockComponent } from './hologram-stock/hologram-stock.component';
import { AvailableStockComponent } from './available-stock/available-stock.component';
import { NumberonlyDirective } from 'src/app/directives/Numberonly.directive';
@NgModule({
  declarations: [
    HologramStockComponent,
    GenerateRandomNoComponent,
    MappingComponent,
    DemappingComponent,
    ProductDamageComponent,
    AvailableStockComponent,
    NumberonlyDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransactionRouteModule
  ]
})
export class TransactionModule { }
