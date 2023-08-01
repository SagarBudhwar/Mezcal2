import { Component, OnInit } from '@angular/core';
import {addProductMaster} from './../../../models/product-master';
import { FormGroup, Validator, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-product-mapping-report',
  templateUrl: './mapping-report.component.html',
  styleUrls: ['./mapping-report.component.scss']
})
export class ProductMappingReportComponent implements OnInit{
  sales: any[] = [];
  cols: any[] = [];
  addProductMaster: FormGroup;
  selectedData: any[] = [];
  selectedColumns: any[] = [];
  totalRecords:number=0;
  MappingList:any[]=[];
  event:any;
  maxDateValue: any
  fromDate: Date;
  toDate:Date;
  ExcelReportResult:any[]=[];
  list: any[] = [];

  constructor(private excelService: ExcelService,private fb:FormBuilder,private api: ApiService,private toastrService: ToastrService) {
    this.SetDate();
   }


   ngOnInit() {
    this.cols = [
    { field: 'productName', header: 'Nombre de producto'},
    { field: 'brandName', header: 'Nombre de la marca' },
    { field: 'type', header: 'Clase' },
    { field: 'stateName', header: 'Nombre del estado' },
     {field: 'certificationNo', header: 'Numero de certificación'},
     {field: 'presentation', header: 'Presentacion' },
     {field: 'bottledLot', header: 'Lote envasado' },
     {field: 'companyName', header: 'Comercializado por' },
    { field: 'prefix', header: 'Prefijo' },
    { field: 'fromNumber', header: 'del numero' },
    { field: 'toNumber', header: 'al numero ' },
    { field: 'quantity', header: 'cantidad '},
   // { field: 'isActive', header: 'Active' },
    //{ field: 'createdBy', header: 'CreatedBy' },
    { field: 'createdDate', header: 'fecha generado' , width: '20%'},
    
];
this.selectedColumns = this.cols;
  }


  SetDate() {
    this.fromDate = new Date();
    this.toDate = new Date();
    this.toDate.setDate(this.toDate.getDate());
    this.fromDate.setDate(this.fromDate.getDate() - 7);
    this.fromDate = new Date(this.fixUTCDate(this.fromDate));
    this.toDate = new Date(this.fixUTCDate(this.toDate));
    this.maxDateValue = new Date();
    this.maxDateValue.setDate(this.maxDateValue.getDate())
  }
  private fixUTCDate(date:any): any {
    if (date) {
      date.setTime(new Date(new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toUTCString()));
      return date;
    }
    return null;
  }



   loadLazy(event:any) {

    this.event = event;
    const obj = this.getLazyLoadingValues(this.event);
    this.getLazyLoadUsers(obj);
  }
  search()
  {
    if(this.fromDate > this.toDate )
    {
      this.toastrService.warning( 'de la fecha debe ser menor o igual ','Warning!');
      return
    }
    this.loadLazy(this.event);

  }
  getLazyLoadingValues(event: any): any {
    const obj = {
      pageSize: event.rows,
      pageNumber:1,
      sortBy: event.multiSortMeta==undefined ?'Id':event.multiSortMeta[0].field,
      sortOrder:event.multiSortMeta==undefined ? 'Desc' : event.multiSortMeta[0].order==1?'Desc':'Asc',
      search: event.globalFilter ? event.globalFilter : '',
      fromDate: this.fromDate,
      toDate: this.toDate,
    };
    return obj;
  }

  getLazyLoadUsers(event: any): any {

    this.api.postApi('Mapping/GetMappingListForGrid',event).subscribe((res: any) => {
      if (res.responseCode == '200') {

        this.MappingList = res.responseData;

        this.totalRecords = res.responseData[0].totalRecord;
      } else {
        this.MappingList = res.ResponseData;
        this.totalRecords = 0;
      }
    });
  }


  //////////////////////////////// Export to Excel Code Start

exportAsXLSX() {

  this.loadLazyExportExcel();
 // this.excelService.exportAsExcelFile(this.ExcelReport, 'PassBook_Report');
}
loadLazyExportExcel() {

  const obj = this.getLazyLoadingValuesExportToExcel(this.event);
  this.getLazyLoadLblPrintForExport(obj);

}
getLazyLoadingValuesExportToExcel(event: any): any {
     ;
  const obj = {
      pageSize: -1,
      pageNumber: 1,
      sortBy: event.multiSortMeta==undefined ?'Id':event.multiSortMeta[0].field,
      sortOrder:event.multiSortMeta==undefined ? 'Desc' : event.multiSortMeta[0].order==1?'Desc':'Asc',
      search: event.globalFilter ? event.globalFilter : '',
      fromDate: this.fromDate,
      toDate: this.toDate,
  };
  return obj;
}
//////// Get Mapping List for Excel

getLazyLoadLblPrintForExport(event: any) {
  this.api.postApi( 'Mapping/GetMappingListForGrid',event).subscribe((response: any) => {

    if (response.responseCode == 200) {

      //this.list = response.ResponseData;
      this.totalRecords = response.responseData[0].totalRows;
      this.ExcelReportResult = [];

      for (let index = 0; index < response.responseData.length; index++) {
        let colHead = {
          'Número De Serie': index+1,
          'Nombre De Producto': response.responseData[index].productName,
          'Nombre de la marca': response.responseData[index].brandName,
          'Clase': response.responseData[index].type,
          'Nombre del estado': response.responseData[index].stateName,
          'Numero de certificación': response.responseData[index].certificationNo,
          'presentacion': response.responseData[index].presentation,
          'Lote envasado': response.responseData[index].bottledLot,
          'Comercializado por': response.responseData[index].companyName,
          'Prefijo': response.responseData[index].prefix,
          'Del Numero': response.responseData[index].fromNumber,
          'Al Numero': response.responseData[index].toNumber,
          'Cantidad': response.responseData[index].quantity,
          'Fecha Generado': response.responseData[index].createdDate,                //this._date.transform(response.ResponseData[index].transactionDate, 'dd-MMM-y'),
        }
        this.ExcelReportResult.push(colHead);
       // this.printReport[index].IssueDate = this._date.transform(response.ResponseData[index].IssueDate, 'dd-MMM-y')
      }
      this.ExcelReportResult.slice();

debugger

        this.excelService.exportAsExcelFile(this.ExcelReportResult, 'Reporte De Productos Mapeados  - ' + new Date());


    }
    else if (response.responseCode == 400){

      this.toastrService.warning('', response.responseMessage);
    }
    else {
      this.list = response.ResponseData;
      this.totalRecords = 0;
    }
  }, err => {
    this.list = [];
    this.totalRecords = 0;
  });
}


//////////////////////////////// Export to Excel Code End
}