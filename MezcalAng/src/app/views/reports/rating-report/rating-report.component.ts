import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import {addProductMaster} from './../../../models/product-master';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validator, FormBuilder } from '@angular/forms';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: 'app-rating-report',
  templateUrl: './rating-report.component.html',
  styleUrls: ['./rating-report.component.scss']
})
export class RatingReportComponent implements OnInit {
  private subscription:Subscription[]=[];
  sales: any[] = [];
  cols: any[] = [];
  addProductMaster: FormGroup;
  selectedData: any[] = [];
  FDate:any;
  value:any;
  TDate:any;
  event :any;
  minDateValue:any;
  FeedbackList:any[]=[];
  totalRecords: number;
  selectedColumns: any[] = [];
  submitted: boolean = false;
  display: boolean = false;
  ExcelReportResult:any[]=[];
  list: any[] = [];
  maxDateValue: any;

  constructor(private toastrService:ToastrService,private api:ApiService,private excelService: ExcelService,) {

  }

//   showDialog() {
//     this.display = true;
// }

  ngOnInit() {

    this.cols = [

      { field: 'productName', header: 'nombre del producto' },//Product
      { field: 'name', header: ' Nombre' }, //Name
      { field: 'mobNo', header: 'numero celular'  },//User Mobile
      { field: 'seqNo', header: 'escanear QR' },//Scan Qr
      // { field: 'height', header: 'Hologram No.' },
      { field: 'usrFeedback', header: 'evaluacion' },//FeedBack
       { field: 'rating', header: 'valuacion de producto' },//Rating
      { field: 'verifiedDt', header: 'fecha de feedback' }, //feedback date
  ];
  this.selectedColumns = this.cols;
    this.TDate= new Date();
    this.FDate = new Date();
    this.FDate.setDate(this.TDate.getDate() - 7);
    this.maxDateValue = new Date();
    this.maxDateValue.setDate(this.maxDateValue.getDate())


  }
  loadLazy(event:any) {

    this.event = event;
    const obj = this.getLazyLoadingValues(this.event);
    this.getVerificationReport(obj);
  }
  getLazyLoadingValues(event: any): any {



    if(this.FDate > this.TDate )
    {
      this.toastrService.warning( 'de la fecha debe ser menor o igual ','Warning!');
      return
    }



  const obj = {

    //First: event.First + 1,
    search: event.globalFilter ? event.globalFilter : '',
    // multiSortMeta: event.multiSortMeta,
     pageSize: event.rows,
    pageNumber :event.first ==0?1: (event.first /event.rows) +1,
    // sortColumn: event.sortField,
     sortOrder: event.sortOrder === 1 ? 'ASC' : 'DESC',
    // isActive: '%',
    FromDate:this.FDate,
    ToDate:this.TDate

  };
  return obj;
}
getVerificationReport(event: any): any {

  this.subscription.push(this.api.postApi('Reports/GetFeedbackReport', event).subscribe((res: any) => {


    this.FeedbackList = res.responseData.responseData;
    this.totalRecords = res.totalCount;
  }))
}
search()
  {
    this.loadLazy(this.event);

  }
  Todatevalidate( )
  {
     this.minDateValue=this.FDate;
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
      pageNumber:1,
      sortBy:'VerificationId',
      sortOrder:event.multiSortMeta==undefined ? 'Desc' : event.multiSortMeta[0].order==1?'Desc':'Asc',
      search: event.globalFilter ? event.globalFilter : '',
      fromDate: this.FDate,
      toDate: this.TDate,
  };
  return obj;
}
//////// Get Rating  List for Excel

getLazyLoadLblPrintForExport(event: any) {
  this.api.postApi( 'Reports/GetFeedbackReport',event).subscribe((response: any) => {

    if (response.responseData.responseCode = "200") {

      //this.list = response.ResponseData;
      this.totalRecords = response.responseData.responseData[0].totalRows;
      this.ExcelReportResult = [];

      for (let index = 0; index < response.responseData.responseData.length; index++) {
        let colHead = {
          'Número De Serie': index+1,
          'nombre del producto': response.responseData.responseData[index].productName,
          'Nombre': response.responseData.responseData[index].name,
          'Numero Celular': response.responseData.responseData[index].mobNo,
          'Escanear QR': response.responseData.responseData[index].seqNo,
          'Evaluacion': response.responseData.responseData[index].usrFeedback,
          'valuacion de producto': response.responseData.responseData[index].rating,
          'Fecha de Feedback': response.responseData.responseData[index].verifiedDt,                //this._date.transform(response.ResponseData[index].transactionDate, 'dd-MMM-y'),

        }
        this.ExcelReportResult.push(colHead);
       // this.printReport[index].IssueDate = this._date.transform(response.ResponseData[index].IssueDate, 'dd-MMM-y')
      }
      this.ExcelReportResult.slice();



        this.excelService.exportAsExcelFile(this.ExcelReportResult, 'Reporte de Evaluacion  - ' + new Date());


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