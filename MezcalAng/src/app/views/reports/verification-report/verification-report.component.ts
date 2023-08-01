import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validator, FormBuilder } from '@angular/forms';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: 'app-verification-report',
  templateUrl: './verification-report.component.html',
  styleUrls: ['./verification-report.component.scss']
})
export class VerificationReportComponent implements OnInit {
  private subscription:Subscription[]=[];
  sales: any[] = [];
  cols: any[] = [];
  addProductMaster: FormGroup;
  selectedData: any[] = [];
  FDate:any;
  options: any;
  maxDateValue: any
  value:any;
  TDate:any;
  event :any;
  minDateValue:any;
  VerificationList:any[];
  lat: number = 51.678418;
  lng: number = 7.809007;
  totalRecords: number;
  totalRows:number;
  selectedColumns: any[] = [];
  submitted: boolean = false;
  display: boolean = false;
  ExcelReportResult:any[]=[];
  list: any[] = [];

  constructor(private excelService: ExcelService,private toastrService:ToastrService,private api:ApiService) {
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
  };
  }

//   showDialog() {
//     this.display = true;
// }

  ngOnInit() {

    this.cols = [
      { field: 'name', header: 'Nombre' },//name
      { field: 'mobile', header: 'numero celular'  },//Mobile Number
      { field: 'productName', header: 'nombre del producto' },//Product Name
      { field: 'seqNo', header: 'escanear QR' },//Scan QR
      // { field: 'height', header: 'Hologram No.' },
      // { field: 'usrlatitude', header: 'Latitude' },
      // { field: 'usrlongitude', header: 'Longitude' },
      // { field: 'ScanState', header: 'State' },
      { field: 'createdDate', header: 'fecha de escaneado' },//scan date
      { field: 'status', header: 'estatus' },//Scan Status
      { field: 'scanMode', header: 'modo escaneo ' }//Scan Mode

  ];

  this.selectedColumns = this.cols;
    this.TDate= new Date();
    this.FDate = new Date();
    this.FDate.setDate(this.TDate.getDate() - 7);
    this.maxDateValue = new Date();
    this.maxDateValue.setDate(this.maxDateValue.getDate())
    //this.api.locationService(26.4806194,80.3982587,'tese');
    // window.location.href = 'http://maps.google.com/?q=28.569420,77.220901';
    //window.open('http://maps.google.com/?q=28.569420,77.220901','_blank')

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
    pageSize: event.rows,
      pageNumber: 1,
      sortBy: event.sortField,
      SortOrder: event.sortOrder === 1 ? 'ASC' : 'DESC',
      search: event.globalFilter ? event.globalFilter : '',

    FromDate:this.FDate,
    ToDate:this.TDate

  };
  return obj;
}
getVerificationReport(event: any): any {
debugger
  this.subscription.push(this.api.postApi('Reports/ScanLogReport', event).subscribe((res: any) => {

    this.VerificationList = res.responseData;
    console.log(res.responseData)
    this.totalRecords = res.responseData[0].totalRows;

  }))
}
editLocationData(rowData: any){


  if(rowData.usrlatitude == null || rowData.usrlongitude == null){
    this.toastrService.warning(`The map is not available for this location`)
    return
  }
  window.open(`https://maps.google.com/?q=${rowData.usrlatitude},${rowData.usrlongitude}&z=60`,'_blank', 'location=yes,height=600,width=1200,scrollbars=yes,status=yes')
}
search()
  {
    this.loadLazy(this.event);

  }
  Todatevalidate( )
  {
     this.minDateValue=this.FDate;
  }



  //////// Get Verification List for Excel

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
        pageSize: this.totalRecords,
        pageNumber: 1,
        sortBy: event.sortField,
        sortOrder:event.multiSortMeta==undefined ? 'Desc' : event.multiSortMeta[0].order==1?'Desc':'Asc',
        search: event.globalFilter ? event.globalFilter : '',
        fromDate: this.FDate,
        toDate: this.TDate,
    };
    return obj;
  }


getLazyLoadLblPrintForExport(event: any) {
 
 
  this.api.postApi( 'Reports/ScanLogReport',event).subscribe((response: any) => {
    
    if (response.responseCode == 200) {

      //this.list = response.ResponseData;
      this.totalRecords = response.responseData[0].totalRows;
      this.ExcelReportResult = [];

      for (let index = 0; index < response.responseData.length; index++) {
        let colHead = {
          'Sr. No': index+1,
          'Nombre': response.responseData[index].name,
          'Numero Celular': response.responseData[index].mobile,
          'Nombre de Producto': response.responseData[index].productName,
          'Escanear QR': response.responseData[index].seqNo,
          'Estatus': response.responseData[index].status,
          'Modo Escaneo': response.responseData[index].scanMode,
          'Fecha de Escaneado': response.responseData[index].createdDate,                //this._date.transform(response.ResponseData[index].transactionDate, 'dd-MMM-y'),

        }

        this.ExcelReportResult.push(colHead);
       // this.printReport[index].IssueDate = this._date.transform(response.ResponseData[index].IssueDate, 'dd-MMM-y')
      }
      this.ExcelReportResult.slice();



        this.excelService.exportAsExcelFile(this.ExcelReportResult, 'Verificacion de Registros - ' + new Date());


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