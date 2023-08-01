import { Component, OnInit } from '@angular/core';
import {addHologramMapping} from './../../../models/hologramMapping';
import { FormGroup, Validator, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-generate-random-no',
  templateUrl: './generate-random-no.component.html',
  styleUrls: ['./generate-random-no.component.scss']
})
export class GenerateRandomNoComponent implements OnInit {
  sales: any[] = [];
  cols: any[] = [];
  selectedData: any[] = [];
  selectedColumns: any[] = [];
  submitted:boolean = false;
  display:boolean = false;
  addHologramMapping: FormGroup;
  constructor(private fb: FormBuilder) {
    this.addHologramMapping = this.fb.group({
      productCode: [''],
      productName: [''],
      fromNo: [''],
      toNo: [''],
      quantity: ['']
    })
  }
  showDialog() {
    this.display = true;
}

  ngOnInit() {

    this.cols = [
      { field: 'lastYearSale', header: 'So. No.' },
      { field: 'fromno', header: 'From No.' },
      { field: 'toNo', header: 'To No.' },
      { field: 'email', header: 'Sent on' },
      { field: 'email', header: 'Sent to' },
  ];
  this.selectedColumns = this.cols;
    this.sales = [
      {fromno: '12-April-2019', toNo: '22-June-2020', brand: 'Apple', lastYearSale: 'SGN001', thisYearSale: 'Other', lastYearProfit: '$54,406.00', thisYearProfit: 'KG', store: 'Finish Goods Store', email: 'adsf@gmail.com', phoneNo: '982134534', state: 'Delhi', city: 'Ashok Nagar', storeName: 'Raw Goods Store', status: 'true', gstNo: 'ABC09232XZY', firstName: 'Raj', lastName: 'kumar', role: 'admin', locName: 'AB1', height: 300, weight: 400, floorName:'First Floor' },
      {fromno: '12-April-2019', toNo: '22-June-2020', brand: 'Samsung', lastYearSale: 'SGN002', thisYearSale: 'Masale', lastYearProfit: '$423,132', thisYearProfit: 'KG', store: 'Finish Goods Store', email: 'weradsf@gmail.com', phoneNo: '982134534', state: 'Delhi', city: 'Ashok Nagar', storeName: 'Finished Goods Store', status: 'false', gstNo: 'ABC09232XZY', firstName: 'Vijay', lastName: 'kumar', role: 'user', locName: 'AB2', height: 2345, weight: 879, floorName:'Second Floor' },
      {fromno: '12-April-2019', toNo: '22-June-2020', brand: 'Microsoft', lastYearSale: 'SGN003', thisYearSale: 'Other', lastYearProfit: '$12,321', thisYearProfit: 'KG', store: 'Finish Goods Store', email: 'adsf@gmail.com', phoneNo: '982134534', state: 'Delhi', city: 'Ashok Nagar', storeName: 'Finished Goods Store', status: 'true', gstNo: 'ABC09232XZY', firstName: 'Ashok', lastName: 'singh', role: 'user', locName: 'AB1', height: 234, weight: 234, floorName:'First Floor' },
      {fromno: '12-April-2019', toNo: '22-June-2020', brand: 'Philips', lastYearSale: 'SGN004', thisYearSale: 'Other', lastYearProfit: '$745,232', thisYearProfit: 'KG', store: 'Finish Goods Store', email: 'uyiyuadsf@gmail.com', phoneNo: '982134534', state: 'Delhi', city: 'Ashok Nagar', storeName: 'Printing Goods Store', status: 'true', gstNo: 'ABC09232XZY', firstName: 'Raj', lastName: 'kumar', role: 'user', locName: 'BB1', height: 300, weight: 400, floorName:'Ground Floor'  },
      {fromno: '12-April-2019', toNo: '22-June-2020', brand: 'Song', lastYearSale: 'SGN005', thisYearSale: 'Other', lastYearProfit: '$643,242', thisYearProfit: 'KG', store: 'Finish Goods Store', email: 'adsf@gmail.com', phoneNo: '982134534', state: 'Delhi', city: 'Ashok Nagar', storeName: 'Finished Goods Store', status: 'false', gstNo: 'ABC09232XZY', firstName: 'Vinod', lastName: 'gupta', role: 'user', locName: 'AB3', height: 234, weight: 766, floorName:'First Floor' },
      {fromno: '12-April-2019', toNo: '22-June-2020', brand: 'LG', lastYearSale: 'SGN006', thisYearSale: 'Other', lastYearProfit: '$421,132', thisYearProfit: 'KG', store: 'Finish Goods Store', email: 'fghfadsf@gmail.com', phoneNo: '982134534', state: 'Delhi', city: 'Ashok Nagar', storeName: 'Finished Goods Store', status: 'true', gstNo: 'ABC09232XZY', firstName: 'Raj', lastName: 'kumar', role: 'user', locName: 'AB1', height: 300, weight: 400, floorName:'Third Floor' },
      {fromno: '12-April-2019', toNo: '22-June-2020', brand: 'Sharp', lastYearSale: 'SGN007', thisYearSale: 'Other', lastYearProfit: '$131,211', thisYearProfit: 'KG', store: 'Finish Goods Store', email: 'vbnvnadsf@gmail.com', phoneNo: '982134534', state: 'Delhi', city: 'Ashok Nagar', storeName: 'Moulding Goods Store', status: 'true', gstNo: 'ABC09232XZY', firstName: 'Ajay', lastName: 'verma', role: 'user', locName: 'AB8', height: 234, weight: 345, floorName:'First Floor' },
      {fromno: '12-April-2019', toNo: '22-June-2020', brand: 'Panasonic', lastYearSale: 'SGN008', thisYearSale: 'Other', lastYearProfit: '$66,442', thisYearProfit: 'KG', store: 'Finish Goods Store', email: 'wrweradsf@gmail.com', phoneNo: '982134534', state: 'Delhi', city: 'Ashok Nagar', storeName: 'Finished Goods Store', status: 'true', gstNo: 'ABC09232XZY', firstName: 'Raj', lastName: 'kumar', role: 'user', locName: 'AB1', height: 300, weight: 400, floorName:'Ground Floor' },
      {fromno: '12-April-2019', toNo: '22-June-2020', brand: 'HTC', lastYearSale: 'SGN009', thisYearSale: 'Other', lastYearProfit: '$765,442', thisYearProfit: 'KG', store: 'Finish Goods Store', email: 'jkghjkadsf@gmail.com', phoneNo: '982134534', state: 'Delhi', city: 'Ashok Nagar', storeName: 'Finished Goods Store', status: 'false', gstNo: 'ABC09232XZY', firstName: 'Satish', lastName: 'Yadav', role: 'user', locName: 'SB1', height: 675, weight: 460, floorName:'First Floor' },
      {fromno: '12-April-2019', toNo: '22-June-2020', brand: 'Toshiba', lastYearSale: 'SGN010', thisYearSale: 'Other', lastYearProfit: '$21,212', thisYearProfit: 'KG', store: 'Finish Goods Store', email: 'adsf@gmail.com', phoneNo: '982134534', state: 'Delhi', city: 'Ashok Nagar', storeName: 'Finished Goods Store', status: 'true', gstNo: 'ABC09232XZY', firstName: 'Raj', lastName: 'kumar', role: 'user', locName: 'AB21', height: 300, weight: 400, floorName:'Fourth Floor' }
  ];
  }

  submit() {
    this.submitted = true;
    if(this.addHologramMapping.invalid) {
      return
    }
    if(this.addHologramMapping.valid) {

      this.addHologramMapping.reset();
      this.display = false;
    }
  }

}