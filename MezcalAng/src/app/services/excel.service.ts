import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {   saveAs as importedSaveAs  } from "file-saver"; 
import 'rxjs/Rx'; 
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  
  baseurl: string;

  constructor(private http: HttpClient,private apiService:ApiService) { 
    this.baseurl = environment.baseUrl;
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
  
}
