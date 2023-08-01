import { Component, OnInit } from '@angular/core';
import { FormGroup, Validator, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { post } from 'jquery';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss']
})
export class UserMasterComponent implements OnInit {
  sales: any[] = [];
  UserList: any[] = [];
  userTypeListForDdl : any[]=[];
  userRoleListForDdl:any[]=[];
  cols: any[] = [];
  ddlFilter:boolean = true;
  selectedData: any[] = [];
  selectedColumns: any[] = [];
  submitted:boolean = false;
  display:boolean = false;
  addUserDetailForm: FormGroup;
  IsActiveReasonHide:boolean=false;
  event: any;
  first: number = 0;
  totalRecords: number=0;
  editMode: boolean = false;
  modalHeader:string='agregar usuario';  // Add User
  ExcelReportResult:any[]=[];
  list: any[] = [];

  constructor(private confirmationService: ConfirmationService,private excelService: ExcelService,private fb: FormBuilder,private apiService:ApiService,private toastrService:ToastrService) {

    this.addUserDetailForm = this.fb.group({
      UserId: [0],
      UserName: ['',Validators.required],
      Email: ['',Validators.required],
      Mobile: ['',[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      RoleId: ['',Validators.required],
      UserType: ['',Validators.required],
      DeviceType: ['Web'],
      Address: [''],
      Password: [''],
      ConfirmPassword: [''],
      InActiveReason:[''],
      IsActive:[true],
      CreatedBy:localStorage.getItem('UserID'),
    })

    this.editMode = false;

    this.GetUserTypeListForDdl();
  }

  ngOnInit(){

    this.cols = [
      { field: 'username', header: ' nombre de usuario' },//User name
      { field: 'email', header: 'ID de Email' },//email id
      { field: 'mobile', header: 'numero celular' },//mobie
      { field: 'roleName', header: 'posicion del usuario' },//user role
      { field: 'userTypeName', header: 'tipo de usuario' },//User type
      {field:'createdBy', header:'generado por'},//crated by
      {field:'createdDate', header:'fecha generado'},//Created Date
      // { field: 'isActive', header: 'IsActive' },
  ];
  this.selectedColumns = this.cols;
    this.GetUserTypeListForDdl();
    this.GetUserRoleListForDdl();
  }

  // Only Alpha and space accepted. Space will not be accepted as first character
  keyPressAlphaOnly(event:any) {

    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Alpha and space . Space will not be first character
    if(this.addUserDetailForm.controls.UserName.value=="" && charCode==32){
      return false;
    }
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode==32 ) {
     return true;
    } else {
      event.preventDefault();
      return false;
    }
  }


  confirmForAciveOrDeactivateUser(userDetail:any) {
    this.confirmationService.confirm({
        // message: 'Are you sure that you want to perform this action?',
        message: '¿Estás seguro de que quieres realizar esta acción?',
        accept: () => {

          this.apiService.getApi('User/ActiveDeactiveUser?UserId='+userDetail.userId).subscribe((resp:any)=>{

           if(resp.responseCode==200){
            this.loadLazy(this.event);
             this.toastrService.success(resp.responseMessage,'Éxito');  // Success
           }
           else{
            this.toastrService.warning(resp.responseMessage,'Advertencia');  // Warning
           }

          },err=>{
            // this.toastrService.error('Server Error !!');
            this.toastrService.error('error de servidor  !!');
          });

        }
    });
}

// ----------------------------- Error VAlidator Code Start ---------------------


  // logValidationErrors(group: FormGroup = this.addUserDetailForm): void {
  //   //    ;
  //   Object.keys(group.controls).forEach((key: string) => {
  //     const abstractControl = group.get(key);
  //     if (abstractControl instanceof FormGroup) {
  //       this.logValidationErrors(abstractControl);
  //     } else {
  //       this.formErrors[key] = '';
  //       if (abstractControl && !abstractControl.valid &&
  //         (abstractControl.touched || abstractControl.dirty)) {
  //         const messages:keyof validationMessages = this.validationMessages[key];
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
    Email:'',
    Mobile: '',
    UserType: '',
    RoleId:''

  };

  validationMessages = {
    'ZoneCode': {
      'required': 'Zone Name is required.',
    },
    'Title': {
      'required': 'Title is required.',
    },
    'Message': {
      'required': 'Message is required.',
    },
    'FromDate': {
      'required': 'From Date is required.',
    },
    'ToDate': {
      'required': 'To Date is required.',
    },
  }

// ----------------------------- Error VAlidator Code End ---------------------


  showDialog() {
    this.display = true;
    this.addUserDetailForm.controls.IsActive.setValue(true);
    this.editMode = false;
    this.modalHeader="agregar usuario";   // Add User
    this.addUserDetailForm.reset();
    this.addUserDetailForm.patchValue({
      IsActive: true
    })
    if(this.addUserDetailForm.controls.IsActive.value==true){
      this.IsActiveReasonHide=false
    }
    else{
      this.IsActiveReasonHide=true;
    }

}

editUser(user:any){

  this.display = true;
  this.editMode = true;
if(user.isActive){
  this.IsActiveReasonHide = false;
}else{
  this.IsActiveReasonHide = true
}
    this.modalHeader="actualizar usuario";   // Update User
      // UserType:user.userType,  this.userTypeListForDdl.find(s => s.userType == user.userTypeName)

//const selectedUsers = this.userTypeListForDdl.find(item => JSON.stringify(item.userType) === JSON.stringify(user.userTypeName));
let userSelected = this.userTypeListForDdl.find(x=>x.id == user.userType)

this.addUserDetailForm.patchValue({
      UserId:user.userId,
      UserName:user.username,
      Email:user.email,
      Mobile:user.mobile,
      RoleId:this.userRoleListForDdl.find(x=>x.roleId == user.roleId),
      UserType:   userSelected,
      IsActive:user.isActive,
      InActiveReason:user.inActiveReason,
      DeviceType:'Web',
      CreatedBy:localStorage.getItem('UserID'),
    });
 this.addUserDetailForm.value;

}

 //save the User details in the database
 public SaveUserDetail() {

  if (this.addUserDetailForm.invalid) {
    return;
  }
  else {

  //  alert(this.addUserDetailForm.controls.UserType.value.id)
    this.addUserDetailForm.patchValue({
      UserType:this.addUserDetailForm.controls.UserType.value.id,
      RoleId:this.addUserDetailForm.controls.RoleId.value.roleId

    });

    this.addUserDetailForm.controls.CreatedBy.setValue(localStorage.getItem('UserID'));
    this.addUserDetailForm.controls.DeviceType.setValue('Web');
    if (!this.editMode) {

      if(this.addUserDetailForm.controls.Password.value==undefined ||this.addUserDetailForm.controls.Password.value==null || this.addUserDetailForm.controls.Password.value=="" )
      {
       this.toastrService.warning('de clave requerida', 'cuidado¡');
      //  this.toastrService.warning('Password is required.', 'Warning');
      }
      else if(this.addUserDetailForm.controls.ConfirmPassword.value==undefined ||this.addUserDetailForm.controls.ConfirmPassword.value==null || this.addUserDetailForm.controls.ConfirmPassword.value=="" )
      {
        // this.toastrService.warning('Confirm Password is required.', 'Warning');
        this.toastrService.warning('confirmacion de clave requerida', 'cuidado¡');
      }
      else
      {
        this.addUserDetailForm.controls.UserId.setValue(0);

        this.Save('User/SaveUserDetail')
      }

    }
    else {
      this.Save('User/UpdateUserDetail');
    }
  }
}



  Save(url: string) {

    this.submitted = true;

    if(this.addUserDetailForm.controls.Email.value==undefined ||this.addUserDetailForm.controls.Email.value==null || this.addUserDetailForm.controls.Email.value=="" )
    {
    //  this.toastrService.warning('Email is required.', 'Warning');
    this.toastrService.warning('coreo es requerido', 'cuidado¡');


    }
    else if(this.addUserDetailForm.controls.Mobile.value==undefined ||this.addUserDetailForm.controls.Mobile.value==null || this.addUserDetailForm.controls.Mobile.value=="" )
    {
      // this.toastrService.warning('Mobile is required.', 'Warning');
      this.toastrService.warning('telefono es requerido', 'cuidado¡');
    }
    else if(this.addUserDetailForm.controls.UserType.value==undefined ||this.addUserDetailForm.controls.UserType.value==null || this.addUserDetailForm.controls.UserType.value=="" )
    {
      // this.toastrService.warning('User Type is required.', 'Warning');
      this.toastrService.warning('tipo de usuario requerido', 'cuidado¡');
    }
    else  if(this.addUserDetailForm.controls.Password.value!==this.addUserDetailForm.controls.ConfirmPassword.value)
    {
      // this.toastrService.warning('Password and Confirm Password must be same.', 'Warning');
      this.toastrService.warning('confirmar clave debe ser la misma que la nueva clave', 'cuidado¡');
    }

  //  if(this.addUserDetailForm.valid) {

      else{

     //
      this.apiService.postApi(url,this.addUserDetailForm.value).subscribe((res:any)=>{

        if(res.responseCode==200){

          this.display = false;
          this.editMode = false;
          this.addUserDetailForm.reset();
          this.loadLazy(this.event);
          this.toastrService.success('', res.responseMessage);
        }
        else{
          this.toastrService.warning('', res.responseMessage);
        }

      },error=>{
        // this.toastrService.error('Server Error !!');
        this.toastrService.error('error de servidor  !!');
      }
      )


    }
  }

   //this method is used to Custom Sort the data grid when we needed.
   public customSort(event:any) {
    this.event = event;
    const obj = this.getLazyLoadingValues(this.event);
    this.getAllUsersList(obj);
  }



  //this method is used to load the data grid when we needed.  sortBy: event.sortField,
  public loadLazy(event:any) {

    this.event = event;
    const obj = this.getLazyLoadingValues(this.event);
    this.getAllUsersList(obj);
  }

  //this method use for set the requiered parameter like page number and page size etc.
  private getLazyLoadingValues(event: any): any {

    const obj = {
      pageSize: event.rows,
      pageNumber: event.first == 0 ? 1 : event.first / event.rows + 1,
      sortBy: event.multiSortMeta==undefined ?'UserId':event.multiSortMeta[0].field,
      sortOrder: event.multiSortMeta==undefined ? 'Desc' : event.multiSortMeta[0].order==1?'Desc':'Asc',
      search: event.globalFilter ? event.globalFilter : '',
    };
    return obj;
  }

  // get all User List from the api.
  public getAllUsersList(event: any): any {
    this.apiService.postApi( 'User/GetUsersList',event).subscribe((res: any) => {
      if (res.responseCode == '200') {

        this.UserList = res.responseData;

        this.totalRecords = res.responseData[0].totalRows;
      } else {
        this.UserList = [];
        this.totalRecords = 0;
      }
    },error=>{

    });
  }



  get u() {
    return this.addUserDetailForm.controls;
  }


  checkPassword():boolean
  {
    if(this.addUserDetailForm.get('Password')!.value===this.addUserDetailForm.get('ConfirmPassword')!.value)
    {
      return true;
    }
    return false;
  }

  GetUserTypeListForDdl(){

    this.apiService.getApi('User/GetUserTypeListForDdl').subscribe((resp:any)=>{
      if (resp.responseCode == 200) {

        this.userTypeListForDdl= resp.responseData;

      //  this.toastr.success('', response.ResponseMessage);
      }
      else {
      //  this.toastr.warning('', response.ResponseMessage);
      }

    });
  }



  GetUserRoleListForDdl(){

    this.apiService.getApi('Role/GetUserRoleListForDdl').subscribe((resp:any)=>{
      if (resp.responseCode == 200) {

        this.userRoleListForDdl= resp.responseData;

      //  this.toastr.success('', response.ResponseMessage);
      }
      else {
      //  this.toastr.warning('', response.ResponseMessage);
      }

    });
  }

  oncheckboxChangeForUser(isChecked: boolean){
    if (!isChecked) {
      this.IsActiveReasonHide=true
      // this.IsCheckedBoxUnCheckedForCust = false;
      // this.IsCheckBoxChecked = true;
      // this.addCustomer.get('IsActive').setValue(this.IsCheckBoxChecked);
    } else {
      this.IsActiveReasonHide=false;
      // this.IsCheckedBoxUnCheckedForCust = true;
      // this.IsCheckBoxChecked = false;
      // this.addCustomer.get('IsActive').setValue(this.IsCheckBoxChecked);
    }
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
      sortBy: event.multiSortMeta==undefined ?'UserId':event.multiSortMeta[0].field,
      sortOrder:event.multiSortMeta==undefined ? 'Desc' : event.multiSortMeta[0].order==1?'Desc':'Asc',
      search: event.globalFilter ? event.globalFilter : '',
  };
  return obj;
}
//////// Get User List for Excel

getLazyLoadLblPrintForExport(event: any) {
  this.apiService.postApi( 'User/GetUsersList',event).subscribe((response: any) => {

    if (response.responseCode == 200) {

      //this.list = response.ResponseData;
      this.totalRecords = response.responseData[0].totalRows;
      this.ExcelReportResult = [];

      for (let index = 0; index < response.responseData.length; index++) {
        let colHead = {
          'número de serie': index+1,
          'nombre de usuario': response.responseData[index].username,
          'ID de Email': response.responseData[index].email,
          'Numero Celular': response.responseData[index].mobile,
          'Posicion del Usuario': response.responseData[index].roleName,
          'Tipo de Usuario': response.responseData[index].userTypeName,
          'Generado Por': response.responseData[index].createdBy,
          'Fecha Generado': response.responseData[index].createdDate,
          'Está activo': response.responseData[index].isActive,                 //this._date.transform(response.ResponseData[index].transactionDate, 'dd-MMM-y'),

        }




        this.ExcelReportResult.push(colHead);
       // this.printReport[index].IssueDate = this._date.transform(response.ResponseData[index].IssueDate, 'dd-MMM-y')
      }
      this.ExcelReportResult.slice();



        this.excelService.exportAsExcelFile(this.ExcelReportResult, 'Configurar Usuario - ' + new Date());


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