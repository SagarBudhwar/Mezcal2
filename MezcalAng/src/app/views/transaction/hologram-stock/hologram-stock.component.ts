import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-hologram-stock',
  templateUrl: './hologram-stock.component.html',
  styleUrls: ['./hologram-stock.component.scss']
})
export class HologramStockComponent implements OnInit {
  cols: any[];
  public cars: any[];
  public datasource: any[];
  public HologramStockForm: any;
  event: any;
  StockDetails: any[] = [];
  totalRecords: number = 0;
  selectedStockColumns: any[];
  editMode: boolean = false;
  btnText: string = '';
  display: boolean = false;
  modalHeading: string = '';
  setToNumber: number = 0;
  prefixValues: any[]=[];
  disablePrefixDropdown:boolean=false;


  constructor(private fb: FormBuilder, private apiService: ApiService, private toastrService: ToastrService) {
    this.cols = [];
    this.cars = [];
    this.datasource = [];
    this.selectedStockColumns = [];


    this.prefixValues = [
      {name: 'A', code: 'A'},
      {name: 'B', code: 'B'},
  ];

   }

  ngOnInit() {

    this.createForm();
    this.disablePrefixDropdown=false;

    this.cols = [
      { field: 'prefix', header: 'prefijo' },
      { field: 'fromNumber', header: 'del numero' },  // From Number
      { field: 'toNumber', header: 'al numero' },
      { field: 'quantity', header: 'cantidad' },      //
      { field: 'remarks', header: 'Observaciones' },       //
    ];

    this.selectedStockColumns = this.cols;

    ////////////////////////////////////////////////



  }

  createForm() {
    this.HologramStockForm = this.fb.group({
      Id:[],
      Prefix: ['', Validators.required],
      FromNumber: ['', Validators.required],
      ToNumber: ['', Validators.required],
      Quantity: ['', Validators.required],
      Remarks: [''],
      IsActive: [true],
      CreatedBy: localStorage.getItem('UserID'),
    });

    this.HologramStockForm.valueChanges.subscribe((data:any) => {
      //this.logValidationErrors();


    })
    this.editMode = false;

  }

  formErrors = {
    Quantity: 'la cantidad debe ser mayor que cero'
    //'Quantity must be greater than zero',
  };

  SelectFromNo(event:any){

    this.HologramStockForm.patchValue({
      ToNumber:'',
      Quantity:''
    })

    this.HologramStockForm.controls.Quantity.setErrors(null);

     const prefix = event.value.name;


     if(prefix!=null || prefix!=undefined || prefix!='' )
     {
      this.getToNumberFromHologramStock(prefix);
     }
     else
     {
       this.toastrService.warning('Please select Prefix !!','Warning')
     }


  }

  // logValidationErrors(group: FormGroup = this.HologramStockForm): void {
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

  validationMessages = {
    'Quantity': {
      'required': 'se requiere cantidad',
      // 'Quantity is required.',
    },
  }

  //this method is used to load the data grid when we needed.
  public loadLazy(event:any) {

    this.event = event;
    const obj = this.getLazyLoadingValues(this.event);
    this.getAllHologramStock(obj);
  }

  //this method use for set the requiered parameter like page number and page size etc.
  private getLazyLoadingValues(event: any): any {
    const obj = {
      pageSize: event.rows,
      pageNumber: event.first == 0 ? 1 : event.first / event.rows + 1,
      sortBy: event.multiSortMeta==undefined ?'Id':event.multiSortMeta[0].field,
      sortOrder: event.multiSortMeta==undefined ? 'Desc' : event.multiSortMeta[0].order==1?'Desc':'Asc',
      search: event.globalFilter ? event.globalFilter : '',
    };
    return obj;
  }

  // get all hologram stock from the api.
  public getAllHologramStock(event: any): any {
    this.apiService.postApi('HologramStock/GetAllHologramStock',event).subscribe((res: any) => {
      if (res.responseCode == '200') {

        this.StockDetails = res.responseData;

        this.totalRecords = res.responseData[0].totalRows;
      } else {
        this.StockDetails = [];
        this.totalRecords = 0;
      }
    });
  }

  showDialog() {
    // this.getToNumberFromHologramStock();
    this.display = true;
    // Create Hologram Stock
    this.modalHeading = 'Agregar';
    this.btnText = 'Enviar';    // Submit
    this.HologramStockForm.reset();
    this.createForm();
    this.disablePrefixDropdown=false;
  }

  private getToNumberFromHologramStock(prefix:string) {
    this.apiService.getApi('HologramStock/GetHologramStockLastColumnData?Prefix='+prefix).subscribe((res: any) => {
      if (res.responseCode == '200') {

        this.setToNumber = res.responseData.respCd;

        this.HologramStockForm.get('FromNumber').setValue(this.setToNumber);
      } else {
        this.setToNumber = 0;
      }
    });
  }

  public focusOutFunction() {
       ;
    if(this.HologramStockForm.controls['Quantity'].value !=undefined && this.HologramStockForm.controls['Quantity'].value != "" &&  Number(this.HologramStockForm.controls['Quantity'].value)>0){
      const sumQtyAndFromNumber = Number(this.HologramStockForm.controls['Quantity'].value) + Number(this.HologramStockForm.controls['FromNumber'].value) - 1;
      this.HologramStockForm.get('ToNumber').setValue(sumQtyAndFromNumber);
    }else{
      this.HologramStockForm.get('ToNumber').setValue('');
    }
  }

  //save the hologram stock details in the database
  public SaveHologramStockDetail() {

    if (this.HologramStockForm.invalid) {
      return;
    }
    else {
      this.HologramStockForm.patchValue({
        Prefix:this.HologramStockForm.controls.Prefix.value.name,

      });

      if (this.editMode) {

        this.HologramStockForm.controls['IsActive'].value==1?
        this.HologramStockForm.controls.IsActive.setValue(true):
        this.HologramStockForm.controls.IsActive.setValue(false);

        this.save('HologramStock/StockUpdate')
      }
      else {
        this.save('HologramStock/CreateStock');
      }
    }
  }

  public save(url: string) {

    this.apiService.postApi(url,this.HologramStockForm.value).subscribe((response: any) => {

      if (response.responseCode == 200) {
        this.display = false;
        this.editMode = false;

        this.loadLazy(this.event);
        this.toastrService.success('', response.responseMessage);
      }
      else {
        this.toastrService.warning('', response.responseMessage);
      }
    }, err => {

      this.toastrService.error('', "error de servidor");
    })
  }
 public editHologramStock(commonDetails:any){

  const req= {

    Id :commonDetails.id,
    Prefix :commonDetails.prefix,
    FromNumber:commonDetails.fromNumber,
    ToNumber:commonDetails.toNumber,
    IsActive:commonDetails.isActive==1?true:false
  }


      ;
   this.apiService.postApi('HologramStock/CheckFromNumberToNumberExist',req).subscribe((response: any) => {
    if (response.responseCode == 200) {
      this.createForm();

    this.disablePrefixDropdown=true;
    this.editMode = true;

    this.HologramStockForm.patchValue({
      Id: commonDetails.id,
      Prefix: this.prefixValues.find(x=>x.name == commonDetails.prefix),
      FromNumber: commonDetails.fromNumber,
      ToNumber: commonDetails.toNumber,
      Quantity: commonDetails.quantity,
      Remarks:  commonDetails.remarks,
      IsActive: commonDetails.isActive
    });
    this.display = true;
    this.modalHeading = 'actualizar inventario';
    // 'Update Hologram Stock';
    this.btnText = 'actualizar';
    // Update
    }
    else {
      this.display = false;
      this.disablePrefixDropdown=false;
      this.toastrService.warning('', response.responseMessage);
    }
  }, err => {

    this.toastrService.error('', "error de servidor");
  });
 }

 get u() {
  return this.HologramStockForm.controls;
}
}
