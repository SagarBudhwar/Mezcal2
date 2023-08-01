import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-available-stock',
  templateUrl: './available-stock.component.html',
  styleUrls: ['./available-stock.component.scss']
})
export class AvailableStockComponent implements OnInit {
  prmGrid1: any;
  AvailableStockList :any []=[];
  totalRecords1 : number=0;
  cols1: any[];
  selectedColumns1: any[];
  AQuantity:number=0;
  BQuantity:number=0;

  constructor(private api: ApiService) {
    this.cols1 = [
    { field: 'rowNum', header: 'numero de serie' },
    { field: 'prefix', header: 'Prefix' },
   { field: 'fromNumber', header: 'del numero' },
   { field: 'toNumber', header: 'al numero' },
   { field: 'quantity', header: 'cantidad' }

 ]
 this.selectedColumns1 = this.cols1;
 }

  ngOnInit() {
  }
  loadLazy1(event:any) {


    this.prmGrid1 = event;
    const obj = this.getLazyLoadingValues1(this.prmGrid1);
    this.getLazyLoadAvailabelHologramStock(obj);
  }
  getLazyLoadingValues1(event: any): any {

    const obj = {
      pageNumber: (event.first == 0 ? 1 : (event.first / event.rows) + 1),
      search: event.globalFilter ? event.globalFilter : '',
     // multiSortMeta: event.multiSortMeta,
      pageSize: event.rows,
      sortBy: event.multiSortMeta==undefined ?'Id':event.multiSortMeta[0].field,
      sortOrder: event.multiSortMeta==undefined ? 'Desc' : event.multiSortMeta[0].order==1?'Desc':'Asc',
    };
    return obj;
  }


  ////////////////// Get Available Hologram Stock.

  //////  QHT-40  -- Available stock should not be work While uncheck the isActive.

  getLazyLoadAvailabelHologramStock(obj: any) {


      this.api.postApi('Mapping/GetAvailabelHologramStock',obj).subscribe((response: any) => {
           ;
        if (response.responseCode == 200) {
          
          this.AvailableStockList = response.responseData;
          this.totalRecords1= response.responseData[0].totalRows;
          this.AQuantity= response.responseData[0].aQuantity;
          this.BQuantity= response.responseData[0].bQuantity;
        }
      });
  }
}
