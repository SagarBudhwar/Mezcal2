import { Component, OnInit } from '@angular/core';
import {addProductMaster} from './../../../models/product-master';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel.service';


@Component({
  selector: 'app-damage-report',
  templateUrl: './damage-report.component.html',
  styleUrls: ['./damage-report.component.scss']
})
export class DamageReportComponent implements OnInit {


  cols: any[];

  public datasource: any[];
  public DamageStockForm: any;
  event: any;
  DamageDetails: any[] = [];
  totalRecords: number;
  selectedDamageColumns: any[];
  editMode: boolean = false;
  btnText: string;
  display: boolean = false;
  modalHeading: string;
  setToNumber: number;
  fromDate: Date;
  toDate:Date;
  ExcelReportResult:any[]=[];
  list: any[] = [];
  maxDateValue: any;


  constructor(private excelService: ExcelService,private fb: FormBuilder, private apiService: ApiService, private toastrService: ToastrService) {
    this.SetDate();
   }

  ngOnInit() {

    this.cols = [
      { field: 'prefix', header: 'Prefijo' },
      { field: 'fromNumber', header: 'del numero' },
      { field: 'toNumber', header: 'al numero ' },
      { field: 'quantity', header: 'cantidad' },
      { field: 'remarks', header: 'notas' },
      { field: 'createdDate', header: 'fecha generado' },
    ];

    this.selectedDamageColumns = this.cols;

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

  //this method is used to load the data grid when we needed.
  public loadLazy(event:any) {

    this.event = event;
    const obj = this.getLazyLoadingValues(this.event);
    this.getAllDamageStock(obj);
  }

  //this method use for set the requiered parameter like page number and page size etc.
  private getLazyLoadingValues(event: any): any {
    const obj = {
      pageSize: event.rows,
      pageNumber: event.first == 0 ? 1 : event.first / event.rows + 1,
      sortBy: event.multiSortMeta==undefined ?'Id':event.multiSortMeta[0].field,
      sortOrder:event.multiSortMeta==undefined ? 'Desc' : event.multiSortMeta[0].order==1?'Desc':'Asc',
      search: event.globalFilter ? event.globalFilter : '',
      fromDate: this.fromDate,
      toDate: this.toDate,
    };
    return obj;
  }

  // get all hologram stock from the api.
  public getAllDamageStock(event: any): any {
    this.apiService.postApi( 'Damage/GetAllDamageStock',event).subscribe((res: any) => {
      if (res.responseCode == '200') {

        this.DamageDetails = res.responseData;

        this.totalRecords = res.responseData[0].totalRows;
      } else {
        this.DamageDetails = [];
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
//////// Get Damage List for Excel

getLazyLoadLblPrintForExport(event: any) {
  this.apiService.postApi( 'Damage/GetAllDamageStock',event).subscribe((response: any) => {

    if (response.responseCode == 200) {

      //this.list = response.ResponseData;
      this.totalRecords = response.responseData[0].totalRows;
      this.ExcelReportResult = [];

      for (let index = 0; index < response.responseData.length; index++) {
        let colHead = {
          'Sr. No': index+1,
          'Prefijo': response.responseData[index].prefix,
          'del numero': response.responseData[index].fromNumber,
          'al numero': response.responseData[index].toNumber,
          'cantidad': response.responseData[index].quantity,
          'notas': response.responseData[index].remarks,
          'fecha generado': response.responseData[index].createdDate,                //this._date.transform(response.ResponseData[index].transactionDate, 'dd-MMM-y'),

        }
        this.ExcelReportResult.push(colHead);
       // this.printReport[index].IssueDate = this._date.transform(response.ResponseData[index].IssueDate, 'dd-MMM-y')
      }
      this.ExcelReportResult.slice();



        this.excelService.exportAsExcelFile(this.ExcelReportResult, 'Reporte De Dañado  - ' + new Date(this.fixUTCDate(new Date())));


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