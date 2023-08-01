import { Component, OnInit } from '@angular/core';
import { FormGroup, Validator, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  sales: any[] = [];
  cols: any[] = [];
  selectedData: any[] = [];
  pagedetails: any;
  HeaderText: string = '';
  buttonText: string = '';
  selectedColumns: any[] = [];
  submitted: boolean = false;
  totalRecords: any;
  display: boolean = false;
  productCategoryForm: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private tstr: ToastrService) {
     this.productCategoryForm = this.fb.group({
      productCategory: ['', Validators.required],
      Description: ['',Validators.required],
      IsActive: [true],
      CreatedBy: [1],
      ID:[0]
    })
  }
  showDialog() {
    this.HeaderText = 'Add Product Category'
    this.buttonText = 'Add'
    this.display = true;
  }

  ngOnInit() {
    this.cols = [
      { field: 'productCategory', header: 'Product Category' },
      { field: 'categoryDescription', header: 'Product Description' },
    ];
    this.selectedColumns = this.cols;
  }
  lazyLoad(event: any) {

    //this method is called on page load to fetch data on the page
    this.pagedetails = event;
    const obj = this.getPageInfo(this.pagedetails);
    this.ProductCategoryData(obj);
  }
  getPageInfo(event: any) {
    //this method is used to get page information


    const requestFilter = {
      PageNo: event.first == 0 ? 1 : (event.first / event.rows) + 1,
      PageSize: event.rows,
      SearchValue: event.globalFilter ? event.globalFilter : '',
      SortColumn: event.sortField == undefined ? null : event.sortField,
      SortOrder: event.sortOrder === 1 ? 'ASC' : 'DESC'
    }
    return requestFilter;
  }
  ProductCategoryData(obj: any) {


    this.api.postApi(`ProductCategory/ProductCategoryList`, obj).subscribe((resp: any) => {

      this.totalRecords = resp.responseData[0].totalRows
      this.sales = resp.responseData
    })
  }
  EditUser(){
    this.api.postApi(`ProductCategory/UpdateProductCategory`, this.productCategoryForm.value).subscribe((resp: any) => {

      if (resp.responseCode == '200') {
        this.tstr.success(resp.responseMessage)
        const obj = this.getPageInfo(this.pagedetails);
        this.ProductCategoryData(obj);
        this.display = false
      }else{
        this.tstr.warning(resp.responseMessage)
      }
    })
  }
  UpdateUser(rowData: any) {


    this.display = true;
    this.buttonText = 'Update'
    this.HeaderText = 'Update Product Category'
    this.productCategoryForm.patchValue({
      productCategory: rowData.productCategory,
      Description: rowData.categoryDescription,
      IsActive: rowData.isActive,
      ID: rowData.id
    })
  }
  AddUser() {


    this.api.postApi(`ProductCategory/AddProductCategory`, this.productCategoryForm.value).subscribe((resp: any) => {

      if (resp.responseCode == '200') {
        this.tstr.success(resp.responseMessage)
        const obj = this.getPageInfo(this.pagedetails);
        this.ProductCategoryData(obj);
        this.display = false
      }else{
        this.tstr.warning(resp.responseMessage)
      }
    })
  }
  submit() {

    this.submitted = true;
    if (this.productCategoryForm.invalid) {
      return
    }
    if (this.productCategoryForm.valid) {

      if (this.buttonText == 'Add') {
        this.AddUser()
      } else if (this.buttonText == 'Update') {
        this.EditUser()
      }
      this.display = false;
    }
  }

}
