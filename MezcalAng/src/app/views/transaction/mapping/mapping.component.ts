import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {
  cols: any[];
  MappingList: any[];
  selectedData: any[];
  modalHeading: string;
  selectedColumns: any[];
  saveDisabled: boolean = false;
  refMapping: any;
  isAvailableDisabled: boolean;
  btnText: string;
  showAvailableModal = false;
  MappingDetailForm: FormGroup;
  ZoneListForDdl: any[] = [];
  ProductsList: any[] = [];
  prodcutNameListForDdl: any[] = [];
  display: boolean = false;
  displayAvailableStock: boolean = false;
  displayProductsList: boolean = false;
  editMode: boolean = false;
  event: any;
  productName: any;
  totalRecords: number = 0;
  prmGrid1: any;
  AvailableStockList: any[] = [];
  totalRecords1: number = 0;
  cols1: any[];
  selectedColumns1: any[];
  submitted: boolean;
  mappingErrorMsg: string = '';
  prmGrid2: any;
  totalRecords2: number = 0;
  cols2: any[];
  selectedColumns2: any[];
  minFromNo: number;
  maxToNo: number;
  clearValue: string;

  constructor(private fb: FormBuilder, private api: ApiService, private toastr: ToastrService) {
    this.createForm();
    this.cols = [
      //  {field: 'rowNum', header: 'SrNo' },
      //  { field: 'id', header: 'Id' },
      { field: 'productName', header: 'nombre de producto' },
      { field: 'productCategory', header: 'categoria' },
      { field: 'prefix', header: 'Prefix' },
      { field: 'fromNumber', header: 'del numero' },
      { field: 'toNumber', header: 'al numero' },
      { field: 'quantity', header: 'cantidad' },
      // { field: 'isActive', header: 'Active' },
      //{ field: 'createdBy', header: 'CreatedBy' },
      { field: 'createdDate', header: 'fecha generado' },
      { field: 'productName', header: 'nombre de producto' },
      // { field: 'ingredients', header: 'Ingredientes' },
      // { field: 'presentation', header: 'Presentacion' },
      // { field: 'certificationNo', header: 'Numero de certificado' },
      // { field: 'bottledLot', header: 'Lote evasado' },
      // { field: 'companyName', header: 'Comercializado por' },
      // { field: 'attributes', header: 'Atributos' },
      // { field: 'stateName', header: 'nombre del estado' },
      // { field: 'productCategory', header: 'Categoria' },
      // { field: 'speciesName', header: 'Especie de maguey' },
      // { field: 'brandName', header: 'Marca' },
      // { field: 'type', header: 'Clase' },
    ];
    this.selectedColumns = this.cols;
    //////////////////////// Bind ProductList Header ////////////////////////
    this.cols2 = [
      // {field: 'rowNum', header: 'SrNo' },
      // {field: 'productId', header: 'ProductId' },
      { field: 'productName', header: 'nombre de producto' },
      { field: 'productCategory', header: 'Categoria' },
      { field: 'ingredients', header: 'Ingredientes' },
      { field: 'presentation', header: 'Presentacion' },
      { field: 'certificationNo', header: 'Numero de certificado' },
      { field: 'bottledLot', header: 'Lote evasado' },
      { field: 'companyName', header: 'Comercializado por' },
      { field: 'attributes', header: 'Atributos' },
      { field: 'stateName', header: 'nombre del estado' },
      { field: 'speciesName', header: 'Especie de maguey' },
      { field: 'brandName', header: 'Marca' },
      { field: 'type', header: 'Clase' },


      // { field: 'productCode', header: 'ProductCode' },
      // { field: 'productDescription', header: 'Product Description' },
      // { field: 'batchNumber', header: 'BatchNumber' },
      //  { field: 'productDescription', header: 'ProductDescription' },
      //{ field: 'createdBy', header: 'CreatedBy' },
      //{ field: 'createdDate', header: 'CreatedDate' }
    ];
    this.selectedColumns2 = this.cols2;
  }

  ngOnInit() {
    this.cols1 = [
      { field: 'rowNum', header: 'numero de serie' },
      { field: 'prefix', header: 'Prefix' },
      { field: 'fromNumber', header: 'del numero' },
      { field: 'toNumber', header: 'al numero' },
      { field: 'quantity', header: 'cantidad' }

    ]
    this.selectedColumns1 = this.cols1;


    this.isAvailableDisabled = true;
    this.MappingDetailForm.controls.ProductName.disable();
    this.MappingDetailForm.controls.Prefix.disable();
    this.MappingDetailForm.controls.FromNumber.disable();
    this.MappingDetailForm.controls.ToNumber.disable();
    this.MappingDetailForm.controls.Quantity.disable();
  }
  loadLazy(event: any) {
    this.event = event;
    const obj = this.getLazyLoadingValues(this.event);
    this.getLazyLoadUsers(obj);
  }
  getLazyLoadingValues(event: any): any {
    const obj = {
      pageSize: event.rows,
      pageNumber: event.first == 0 ? 1 : event.first / event.rows + 1,
      sortBy: event.sortField,
      sortOrder: event.multiSortMeta == undefined ? 'Desc' : event.multiSortMeta[0].order == 1 ? 'Desc' : 'Asc',
      search: event.globalFilter ? event.globalFilter : '',
    };
    return obj;
  }
  showDialog() {
    this.prodcutNameListForDdl = [];
    this.display = true;
    this.modalHeading = 'crear el mapeo';
    this.btnText = 'enviar';
    this.createForm();
    this.productName = '';

    this.GetProductListForDdl();

    // this.MappingDetailForm.controls['FromNumber'].disable();
    // this.MappingDetailForm.controls['ToNumber'].disable();
    //this.MappingDetailForm.controls.FromNumber.disable();
    //this.MappingDetailForm.controls.ToNumber.disable();
    this.MappingDetailForm.controls.Quantity.disable();
    this.minFromNo = 0;
    this.maxToNo = 0;

    // this.MappingDetailForm.controls.FromNumber.enable();
    // this.MappingDetailForm.controls.ToNumber.enable();

    this.resetForm();
  }
  createForm() {
    this.MappingDetailForm = this.fb.group({
      ProductId: ['', Validators.required],
      ProductName: ['', Validators.required],
      Prefix: ['', Validators.required],
      FromNumber: ['', Validators.required],
      ToNumber: ['', Validators.required],
      Quantity: ['', Validators.required],
      CreatedBy: localStorage.getItem('UserID'),
    })
    // this.MappingDetailForm.valueChanges.subscribe((data) => {
    //   this.logValidationErrors();
    // })
    this.editMode = false;
  }
  // logValidationErrors(group: FormGroup = this.MappingDetailForm): void
  //  {
  //   //    ;
  //   Object.keys(group.controls).forEach((key: string) => {
  //     const abstractControl = group.get(key);
  //     if (abstractControl instanceof FormGroup) {
  //       this.logValidationErrors(abstractControl);
  //     } else {
  //       this.formErrors[key] = '';
  //       if (abstractControl && !abstractControl.valid &&
  //         (abstractControl.touched || abstractControl.dirty)) {
  //         const messages = this.validationMessages[key];
  //         for (const errorKey in abstractControl.errors) {
  //           if (errorKey) {
  //             this.formErrors[key] += messages[errorKey] + ' ';
  //           }
  //         }
  //       }
  //     }
  //   });
  // }
  formErrors = {
    ProductId: '',
    ProductName: '',
    FromNumber: '',
    ToNumber: '',
    Quantity: ''

  };
  validationMessages = {
    'ProductId': {
      'required': 'Product  is required.',
    },
    'ProductName': {
      'required': 'Product  is required.',
    },
    'FromNumber': {
      'required': 'FromNumber is required.',
    },
    'ToNumber': {
      'required': 'ToNumber is required.',
    },
    'Quantity': {
      'required': 'Quantity is required.',
    },
  }

  /////////////   Get Mapping List For Grid

  getLazyLoadUsers(event: any): any {
    
    this.api.postApi('Mapping/GetMappingListForGrid', event).subscribe((res: any) => {
      if (res.responseCode == '200') {
      
        this.MappingList = res.responseData;
        
        this.totalRecords = res.responseData[0].totalRecord;
      } else {
        this.MappingList = [];
        this.totalRecords = 0;
      }
    });
  }
  /////////////   Get Mapping List For dropdownlist

  GetProductListForDdl() {
    this.prodcutNameListForDdl = [];
    this.api.getApi('Mapping/GetProductsListForDdl').subscribe((resp: any) => {
      if (resp.responseCode == 200) {
     
        this.prodcutNameListForDdl = resp.responseData;


        //  this.toastr.success('', response.ResponseMessage);
      }
      else {
        //  this.toastr.warning('', response.ResponseMessage);
      }

    });
  }
  SaveMapping() {
 
    if (this.MappingDetailForm.invalid) {
      return;
    }
    else if (this.MappingDetailForm.controls.FromNumber.value == undefined || this.MappingDetailForm.controls.FromNumber.value == null || this.MappingDetailForm.controls.FromNumber.value == "") {
      // this.toastr.warning('From number is required.', 'Warning');
      this.toastr.warning('Se requiere el número.', 'Advertencia');
    }
    else if (this.MappingDetailForm.controls.ToNumber.value == undefined || this.MappingDetailForm.controls.ToNumber.value == null || this.MappingDetailForm.controls.ToNumber.value == "") {
      // this.toastr.warning('To number is required.', 'Warning');
      this.toastr.warning('Se requiere un número.', 'Advertencia');

    }
    else if (this.MappingDetailForm.controls.Quantity.value == undefined || this.MappingDetailForm.controls.Quantity.value == null || this.MappingDetailForm.controls.Quantity.value == "") {
      // this.toastr.warning('Quantity is required.', 'Warning');
      this.toastr.warning('Se requiere cantidad.', 'Advertencia');

    }

    else {
      const form = this.MappingDetailForm.getRawValue();
      //  form.ProductId= form.ProductId.productId;
      // this.MappingDetailForm.patchValue({
      //   ProductId: this.MappingDetailForm.controls.ProductId.value.productId,
      // });
    
      this.api.postApi('Mapping/SaveMapping', form).subscribe((response: any) => {

        if (response.responseCode == 200) {
          this.display = false;
          this.editMode = false;
          this.loadLazy(this.event);
          this.toastr.success('', response.responseMessage);
        }
        else {
          this.toastr.warning('', response.responseMessage);
        }

      }, err => {

        // this.toastr.error('Server Error !!');
        this.toastr.error('error de servidor  !!');
      })
    }
  }
  selectAvailableStock(accp: any) {

    this.saveDisabled = true;
    this.refMapping = accp;


    this.MappingDetailForm.patchValue({
      Prefix: accp.prefix,
      FromNumber: accp.fromNumber,
      ToNumber: accp.toNumber,
      Quantity: accp.quantity
    });
    this.minFromNo = accp.fromNumber;
    this.maxToNo = accp.toNumber;

    this.MappingDetailForm.controls.FromNumber.enable();
    this.MappingDetailForm.controls.ToNumber.enable();
    this.displayAvailableStock = false;
  }

  valueChange(getFrom: any) {

    //QHT-117 solved by allowing mapping only from the available stock
    const form = this.MappingDetailForm.getRawValue();
    const fromNo = Number(form.FromNumber);
    const toNo = Number(form.ToNumber);
    const qty = toNo - fromNo + 1;

    if (qty > 0 && fromNo != 0 && toNo != 0) {
      this.MappingDetailForm.patchValue({
        Quantity: qty
      });
    }
    else {
      this.MappingDetailForm.patchValue({
        Quantity: ""
      });
    }



    if (fromNo && toNo && Number(fromNo) > 0 && Number(toNo) > 0 && Number(toNo) >= Number(fromNo)) {
      if (fromNo < this.refMapping.fromNumber || fromNo > this.refMapping.toNumber
        || toNo > this.refMapping.toNumber || toNo < this.refMapping.fromNumber) {
        if (fromNo < this.refMapping.fromNumber || fromNo > this.refMapping.toNumber) {

          this.MappingDetailForm.controls.FromNumber.setErrors({ outOfRange: true });
        }
        if (toNo > this.refMapping.toNumber || toNo < this.refMapping.fromNumber) {
          this.MappingDetailForm.controls.ToNumber.setErrors({ outOfRange: true });
        }
      } else {

        if (Number(toNo) == Number(fromNo)) {
          if (getFrom == 2)
          {
            this.MappingDetailForm.controls.FromNumber.setErrors(null);
          }
        }
        this.MappingDetailForm.patchValue({
          Quantity: qty
        });
      }
    } else {
      if (!fromNo) {
        if (fromNo === 0) {
          this.MappingDetailForm.controls.FromNumber.setErrors({ fromNoZero: true });
        }
        if (!toNo || Number(toNo) === 0) {
          if (!toNo) {
            this.MappingDetailForm.controls.ToNumber.setErrors({ fromNoZero: true });
            this.MappingDetailForm.controls.Quantity.setErrors({ required: true });
          } else {
            this.MappingDetailForm.controls.Quantity.setErrors({ qtyZero: true });
          }
        }
      }
      if (Number(toNo) < Number(fromNo)) {
        if (getFrom == 1)
          this.MappingDetailForm.controls.FromNumber.setErrors({ fromNoGreater: true });
        else
          this.MappingDetailForm.controls.ToNumber.setErrors({ fromNoGreater: true });
      }
    }
  }
  close() {
    this.clearValue = 'test';
  }
  loadLazy1(event: any) {


    this.prmGrid1 = event;
    const obj = this.getLazyLoadingValues1(this.prmGrid1);
    this.getLazyLoadAvailabelHologramStock(obj);
  }
  getLazyLoadingValues1(event: any): any {
debugger
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

  getLazyLoadAvailabelHologramStock(obj: any) {


    this.api.postApi('Mapping/GetAvailabelHologramStock', obj).subscribe((response: any) => {
         ;
      if (response.responseCode == 200) {
        this.AvailableStockList = response.responseData;
        this.totalRecords1 = response.responseData[0].totalRows;
      }
    });
  }
  DefaultValues() {
    const obj = {
      pageNumber: 1,
      search: '',
      pageSize: 5,
      sortBy: "Id",
      sortOrder: 'DESC'
    };
    return obj;
  }
  openAvailableStock() {
     debugger
    this.displayAvailableStock = true;
    const obj = this.DefaultValues();
    this.getLazyLoadAvailabelHologramStock(obj);
  }

  ////////////////////////////////// Select Product Code Start ////////////////////////////////////
  openProductList() {

    this.displayProductsList = true;
    this.clearValue = '';
    const obj = this.DefaultValues();
    this.getLazyLoadProductList(obj);
  }

  loadLazy2(event: any) {


    this.prmGrid2 = event;
    const obj = this.getLazyLoadingValuesProd(this.prmGrid2);
    this.getLazyLoadProductList(obj);
  }
  getLazyLoadingValuesProd(event: any): any {

    const obj = {
      pageNumber: (event.first == 0 ? 1 : (event.first / event.rows) + 1),
      search: event.globalFilter ? event.globalFilter : '',
      // multiSortMeta: event.multiSortMeta,
      pageSize: event.rows,
      sortBy: event.sortField,
      sortOrder: event.sortOrder === 1 ? 'ASC' : 'DESC'
    };
    return obj;
  }
  ////////////////// Get Product Code List /////////.

  getLazyLoadProductList(obj: any) {

    this.ProductsList = [];
    this.api.postApi('Mapping/GetProductListForSelect', obj).subscribe((response: any) => {
         ;
      if (response.responseCode == 200) {
        this.ProductsList = response.responseData;
        this.totalRecords2 = response.responseData[0].totalRows;
      }
    });
  }

  selectProduct(commonDetail: any) {

    this.saveDisabled = true;
    this.isAvailableDisabled = false;
    // this.refMapping = commonDetail;
    //


    this.MappingDetailForm.patchValue({
      ProductId: commonDetail.productId,
      ProductName: commonDetail.productName,
    });
    this.MappingDetailForm.controls['FromNumber'].setErrors({ 'incorrect': true });
    this.MappingDetailForm.controls['ToNumber'].setErrors({ 'incorrect': true });



    this.displayProductsList = false;
  }
  //////////////////////// Select product End /////////////////////////////
  closeMainModal() {
    this.display = false;
    this.resetForm();
  }
  resetForm() {
    this.submitted = false;
    this.createForm();
    this.isAvailableDisabled = true;
    // this.MappingDetailForm.controls.FromNumber.disable();
    // this.MappingDetailForm.controls.ToNumber.disable();
    this.MappingDetailForm.controls['FromNumber'].disable();
    this.MappingDetailForm.controls['ToNumber'].disable();
    this.MappingDetailForm.controls.Quantity.disable();
    const obj = this.f;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key].setErrors(null);
      }
    }
  }
  get f() {
    return this.MappingDetailForm.controls;
  }
}
