import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Mapping } from 'src/app/models/hologramMapping';

@Component({
  selector: 'app-de-mapping',
  templateUrl: './de-mapping.component.html',
  styleUrls: ['./de-mapping.component.scss']
})
export class DemappingComponent  implements OnInit {
  cols: any[];
  SchemeList: any[];
  selectedData: any[];
  modalHeading:string;
  selectedColumns: any[];
  saveDisabled: boolean = false;
  formval: Mapping = new Mapping();
  refMapping: any;
  btnText: string;
  show: boolean = false;
  showAvailableModal = false;
  DeMappingDetailForm: FormGroup;
  ZoneListForDdl:any[]=[];
  productListForDdl:any[]=[];
  mappingErrorMsg: string = '';
  display: boolean = false;
  displayAvailableStock :boolean =false;
  editMode: boolean = false;
  event : any;
  productName:any;
  totalRecords:number=0;
  prmGrid1: any;
  AvailableStockList :any []=[];
  totalRecords1 : number=0;
  cols1: any[];
  selectedColumns1: any[];
  submitted: boolean;
  minFromNo: number;
  maxToNo: number;
  maxQty:number;
  ActionType:string='';



  constructor(private fb:FormBuilder,private api: ApiService, private toastr: ToastrService) {
    this.createForm();
    this.cols = [

    //  { field: 'id', header: 'Id' },
    { field: 'productCategory', header: 'categoria' },
      { field: 'productName', header: 'nombre de producto' },
      { field: 'prefix', header: 'Prefijo' },
      { field: 'fromNumber', header: 'del numero' },
      { field: 'toNumber', header: 'al numero' },
      { field: 'quantity', header: 'cantidad' },
     // { field: 'isActive', header: 'Active' },
      //{ field: 'createdBy', header: 'CreatedBy' },
      { field: 'createdDate', header: 'fecha generado' }
  ];
  this.selectedColumns = this.cols;
   }

  ngOnInit() {
  this.DeMappingDetailForm.controls.ProductName.disable();
  this.DeMappingDetailForm.controls.Prefix.disable();
  this.DeMappingDetailForm.controls.Quantity.disable();
  }
  loadLazy(event:any) {

    this.event = event;
    const obj = this.getLazyLoadingValues(this.event);
    this.getLazyLoadMappingList(obj);
  }
  getLazyLoadingValues(event: any): any {
    const obj = {
      pageSize: event.rows,
      pageNumber: event.first == 0 ? 1 : event.first / event.rows + 1,
      sortBy: event.sortField,
      sortOrder:  event.multiSortMeta == undefined ? 'Desc' : event.multiSortMeta[0].order == 1 ? 'Desc' : 'Asc',
      search: event.globalFilter ? event.globalFilter : '',
    };
    return obj;
  }
  showEditDialog(rowDetails:any,actionType:string) {

    this.display = true;
    // demapping -> modal heading
    this.modalHeading = 'eliminar mapeo';
    this.btnText = 'enviar';
    this.createForm();
    this.productName='';
    this.refMapping = rowDetails;
    this.formval = rowDetails;
    this.ActionType = actionType;

    this.maxToNo = parseInt(rowDetails.ToNumber);
    this.minFromNo = parseInt(rowDetails.FromNumber);
    this.maxQty = parseInt(rowDetails.Quantity);

    this.DeMappingDetailForm.patchValue({
      Id:rowDetails.id,
      ProductId:rowDetails.productId,
      ProductName:rowDetails.productName,
      Prefix:rowDetails.prefix,
      FromNumber: rowDetails.fromNumber,
      ToNumber: rowDetails.toNumber,
      Quantity: rowDetails.quantity,
     // IsActive: rowDetails.isActive,
    });

    if(actionType==="Demap"){
      this.DeMappingDetailForm.patchValue({
        Remarks:"Dummy String for remove required error in case of Demap"
      });
    }
    if(actionType==="Damage"){
      // this.modalHeading="Create Damage Stock";
         this.modalHeading="Crear stock de daños";
    }
    if(actionType==="Stolen"){
      // this.modalHeading="Create Stolen Stock";
      this.modalHeading="Crear stock robado";
    }



  }
  createForm()
  {
    this.DeMappingDetailForm=this.fb.group({
      Id:['',Validators.required],
      ProductId:['',Validators.required],
      ProductName:['',Validators.required],
      Prefix:['',Validators.required],
      FromNumber:['',Validators.required],
      ToNumber:['',Validators.required],
      Quantity:[''],
      Remarks: ['',Validators.required],
      IsActive: [false],     // Using for only Damage currently
      CreatedBy:localStorage.getItem('UserID'),
    })
    // this.DeMappingDetailForm.valueChanges.subscribe((data) => {
    //   this.logValidationErrors();
    // })
    this.editMode = false;
  }





  // logValidationErrors(group: FormGroup = this.DeMappingDetailForm): void {
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
    Prefix: '',
    ProductName:'',
    FromNumber: '',
    ToNumber: '',
    Quantity:'',
    Remarks: '',

  };
  validationMessages = {
    'ProductId': {
      'required': 'Product  is required.',
    },
    'ProductName': {
      'required': 'Product Name  is required.',
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
    'Remarks': {
      'required': 'Remarks is required.',
    },
  }

  /////////////   Get Mapping List For Grid

  getLazyLoadMappingList(event: any): any {
    this.api.postApi( 'Mapping/GetMappingListForGrid',event).subscribe((res: any) => {
      if (res.responseCode == '200') {

        this.SchemeList = res.responseData;

        this.totalRecords = res.responseData[0].totalRecord;
      } else {
        this.SchemeList = [];
        this.totalRecords = 0;
      }
    });
  }

 //save the hologram stock details in the database
 public SaveDamageOrDemapStockDetail() {

  if (this.DeMappingDetailForm.invalid) {
    return;
  }
  else if(this.ActionType=='' || this.ActionType==null ||this.ActionType==undefined){
        //  this.toastr.warning('Sorry !! This action can not be completed.','Warning')
         this.toastr.warning('Perdón !! Esta acción no se puede completar.','Advertencia')
  }
  else {
        if(this.ActionType=='Demap')
        {
         this.SaveDemappingOrDemap('Mapping/DeMapping');
        }
       else if(this.ActionType=='Damage')
        {

          this.DeMappingDetailForm.patchValue({
            IsActive: true,
          });


         this.SaveDemappingOrDemap('Damage/SaveDamage');
        }
        else if(this.ActionType=='Stolen')
        {

          this.DeMappingDetailForm.patchValue({
            IsActive: true,
          });


         this.SaveDemappingOrDemap('Stolen/SaveStolen');
        }
        else{
           //  this.toastr.warning('Sorry !! This action can not be completed.','Warning')
           this.toastr.warning('Perdón !! Esta acción no se puede completar.','Advertencia')

        }
  }
}



  SaveDemappingOrDemap(url: string) {

    if (this.DeMappingDetailForm.invalid) {
      return;
    }
    else {

      this.show = true;
    if (
      (parseInt(this.formval.FromNumber) < this.minFromNo ||
        parseInt(this.formval.ToNumber) > this.maxToNo) &&
      this.formval.HologramID != 1
    ) {
      // this.toastr.warning('Invalid Numbers to Deallocate', 'Warning!', {
      //   timeOut: 3000
      // });
      this.toastr.warning('Números no válidos para desasignar', 'Advertencia!', {
        timeOut: 3000
      });
      this.show = false;
    }
else{
      const form = this.DeMappingDetailForm.getRawValue();
    // this.DeMappingDetailForm.patchValue({
    //   ProductId: this.DeMappingDetailForm.controls.ProductId.value.productId,
    // });

    this.api.postApi( url,form).subscribe((response: any) => {

      if (response.responseCode == 200) {
        this.display = false;
        this.editMode = false;
        this.ActionType='';
        this.loadLazy(this.event);
        this.toastr.success('', response.responseMessage);
      }
      else {
        this.toastr.warning('', response.responseMessage);
      }

    }, err => {

      // this.toastr.error('Server Error !!');
      this.toastr.error('error de servidor  !!');
      this.formval.FromNumber =
      this.formval.Prefix + this.formval.FromNumber;
    this.formval.ToNumber = this.formval.Prefix + this.formval.ToNumber;
    this.resetmodal();
    this.show = false;
    })
  }
}
}
resetmodal() {
  this.formval.Prefix = '';
  this.formval.FromNumber = '';
  this.formval.ToNumber = '';
  this.formval.Quantity = '';
  this.formval.ProductID = 0;
  this.formval.OracleCode = '';
  this.maxToNo = 0;
  this.minFromNo = 0;
  this.formval.HologramID = 0;
  this.mappingErrorMsg = '';
}
selectAvailableStock(accp: any) {

  this.saveDisabled = true;
  this.refMapping = accp;


  this.DeMappingDetailForm.patchValue({
    FromNumber: accp.fromNumber,
    ToNumber: accp.toNumber,
    Quantity: accp.quantity
  });


  this.DeMappingDetailForm.controls.FromNumber.enable();
  this.DeMappingDetailForm.controls.ToNumber.enable();
  this.displayAvailableStock = false;
}
valueChange(getFrom : any) {

  const form = this.DeMappingDetailForm.getRawValue();
  const fromNo = Number(form.FromNumber);
  const toNo = Number(form.ToNumber);
  const qty = toNo - fromNo + 1;

  if(qty>0 && fromNo!=0  && toNo!=0){
    this.DeMappingDetailForm.patchValue({
      Quantity: qty
    });
    }
  else{
    this.DeMappingDetailForm.patchValue({
      Quantity: ""
    });
  }
  if (fromNo && toNo && Number(fromNo) > 0 && Number(toNo) > 0 && Number(toNo) >= Number(fromNo)) {
    if (fromNo <this.refMapping.fromNumber|| fromNo > this.refMapping.toNumber
       || toNo >  this.refMapping.toNumber  || toNo < this.refMapping.fromNumber) {
      if (fromNo < this.refMapping.fromNumber || fromNo >  this.refMapping.toNumber ) {

        this.DeMappingDetailForm.controls.FromNumber.setErrors({ outOfRange: true });
      }
      if (toNo > this.refMapping.toNumber || toNo <  this.refMapping.fromNumber) {
        this.DeMappingDetailForm.controls.ToNumber.setErrors({ outOfRange: true });
      }
    } else {
      if (Number(toNo) == Number(fromNo)) {
        if (getFrom == 2)
        {
          this.DeMappingDetailForm.controls.FromNumber.setErrors(null);
        }
      }

      this.DeMappingDetailForm.patchValue({
        Quantity: qty
      });
    }
  } else {
    if (!fromNo) {
      if (fromNo === 0) {
        this.DeMappingDetailForm.controls.FromNumber.setErrors({ fromNoZero: true });
      }
      if (!toNo || Number(toNo) === 0) {
        if (!toNo) {
          this.DeMappingDetailForm.controls.ToNumber.setErrors({ fromNoZero: true });
          this.DeMappingDetailForm.controls.Quantity.setErrors({ required: true });
        } else {
          this.DeMappingDetailForm.controls.Quantity.setErrors({ qtyZero: true });
        }
      }
    }
    if (Number(toNo) < Number(fromNo)) {
      if(getFrom==1)
      this.DeMappingDetailForm.controls.FromNumber.setErrors({ fromNoGreater: true });
      else
      this.DeMappingDetailForm.controls.ToNumber.setErrors({ fromNoGreater: true });
    }
  }
}

loadLazy1(event:any) {


  this.prmGrid1 = event;
  const obj = this.getLazyLoadingValues1(this.prmGrid1);
  this.getLazyLoadAvailabelHologramStock(obj);
}
getLazyLoadingValues1(event: any): any {

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
////////////////// Get Availabel Hologram Stock.

getLazyLoadAvailabelHologramStock(obj: any) {


    this.api.postApi('Mapping/GetAvailabelHologramStock',obj).subscribe((response: any) => {
         ;
      if (response.responseCode == 200) {
        this.AvailableStockList = response.responseData;
        this.totalRecords1= response.ResponseData[0].totalCount;
      }
    });
}
DefaultValues(){
  const obj = {
    pageNumber: 1,
    search:  '',
    pageSize: 5,
    sortBy: "",
    sortOrder: 'DESC'
  };
  return obj;
}
openAvailableStock()
{

  this.displayAvailableStock=true;
  const obj =  this.DefaultValues();
  this.getLazyLoadAvailabelHologramStock(obj);
}
closeMainModal() {
  this.display = false;
  this.resetForm();
}
resetForm() {
  this.submitted = false;
  this.createForm();
  this.DeMappingDetailForm.controls.FromNumber.disable();
  this.DeMappingDetailForm.controls.ToNumber.disable();
  this.DeMappingDetailForm.controls.Quantity.disable();
  const obj = this.f;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key].setErrors(null);
    }
  }
}



get f() {
  return this.DeMappingDetailForm.controls;
}
}
