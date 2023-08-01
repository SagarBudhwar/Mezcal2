import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.scss']
})
export class StateMasterComponent implements OnInit {

  sales: any[] = [];
  pagedetails: any;
  totalRecords: any;
  cols: any[] = [];
  selectedData: any[] = [];
  selectedColumns: any[] = [];
  submitted: boolean = false;
  display: boolean = false;
  CommonMaster: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private tstr: ToastrService) {
    this.CommonMaster = this.fb.group({
      BrandID: [''],
      StateName: ['', Validators.required],
      CreatedBy: [localStorage.getItem('UserID')],
      CreatedDate: [''],
      UpdatedBy: [localStorage.getItem('UserID')],
      UdatedDate: [''],
      IsActive: [true]

    })
  }
  createForm() {

  }

  get f() {
    return this.CommonMaster.controls;
  }
  showDialog() {
    this.display = true;
    this.createForm()
  }

  addBrand() {

    this.api.postApi(`Common/AddStateMaster`, this.CommonMaster.value).subscribe((resp: any) => {

      if (resp.responseCode == '200') {
        this.tstr.success(resp.responseMessage)
      }
      else {
        this.tstr.warning(resp.responseMessage)
      }
    })
  }

  ngOnInit() {


    this.createForm()
    this.cols = [
      { field: 'stateName', header: 'Brand Name' },
      { field: 'createdBy', header: 'Created By' },
      { field: 'createdDate', header: 'Created Date.' },
      { field: 'updatedBy', header: 'Updated By' },
      { field: 'upatedDate', header: 'Udated Date' },
    ];
    this.selectedColumns = this.cols;
    this.sales = []
  }
  lazyLoad(event: any) {

    //this method is called on page load to fetch data on the page
    this.pagedetails = event;
    const obj = this.getPageInfo(this.pagedetails);
    this.getBrandList(obj);
  }
  getPageInfo(event: any) {
    //this method is used to get page information


    const requestFilter = {
      PageNumber: event.first == 0 ? 1 : (event.first / event.rows) + 1,
      PageSize: event.rows,
      Search: event.globalFilter ? event.globalFilter : '',
      SortBy: event.sortField == undefined ? null : event.sortField,
      SortOrder: event.sortOrder === 1 ? 'ASC' : 'DESC'
    }
    return requestFilter;
  }
  getBrandList(obj: any) {


    this.api.postApi(`Common/GetStateMasterList`, obj).subscribe((resp: any) => {

      this.totalRecords = resp.responseData[0].totalRows
      this.sales = resp.responseData
    })
  }

  submit() {
    this.submitted = true;
    if (this.CommonMaster.invalid) {
      return
    }
    if (this.CommonMaster.valid) {

      this.addBrand();
      this.display = false;
    }
  }

}
