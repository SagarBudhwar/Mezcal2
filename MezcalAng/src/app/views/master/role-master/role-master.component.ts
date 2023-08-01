import { Component, OnInit } from '@angular/core';
import { FormGroup, Validator, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import {TreeNode} from 'primeng/api';
import { Role, RoleManage } from 'src/app/models/role';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.scss']
})
export class RoleMasterComponent implements OnInit {
  cols: any[];
  userData: any[];
  display: boolean;
  modalHeading: string;
  btnText: string;
  permissionModal = false;
  roleFormData: FormGroup;
  totalRecord: number;
  roles: any[];
  prmGrid: any;
  pages: any;
  IsModal:boolean=true;
  selectedNodes3:any = [];
  roleCols: { field: string; header: string }[];
  selectedRole: Role;
  constructor(private fb: FormBuilder, private apiService: ApiService, private toastrService: ToastrService) {}

  ngOnInit() {
    this.createForm();
    this.cols = [
      { field: 'roleName', header: 'nombre de la posicion' },  // Role Name
      { field: 'remarks', header: 'notas' }, // Remarks
    ];
    this.roleCols = [{ field: 'pageName', header: 'Nombre' }];  // Name
  }
  createForm() {
    this.roleFormData = this.fb.group({
      roleId: [0],
      roleName: ['', Validators.required],
      remarks: [''],
      isActive: [true],
      updatedBy:[localStorage.getItem('UserID')],
    });
  }

  loadLazy(event:any) {
    this.prmGrid = event;
    const obj = this.getLazyLoadingValues(this.prmGrid);
    this.getRoles(obj);
  }
  getLazyLoadingValues(event: any) {
    const obj = {
      pageNumber: event.first === 0 ? 1 : event.first / event.rows + 1,
      search: event.globalFilter ? event.globalFilter : '',
      pageSize: event.rows,
      sortBy:  event.multiSortMeta==undefined ?'RoleId':event.multiSortMeta[0].field,
      sortOrder: event.multiSortMeta==undefined ? 'Desc' : event.multiSortMeta[0].order==1?'Desc':'Asc',
      isActive: true,
    };
    return obj;
  }
//Get roles for grid in role management
  getRoles(event:any) {

    this.apiService.postApi( 'Role/GetRoles',event).subscribe(
      (response: any) => {

        if(response.responseCode==200)
        {
        this.roles = response.responseData;
        this.totalRecord = response.responseData[0].totalRows;
        }
        // else{
        //   this.toastrService.warning( response.responseMessage);
        // }
      },
      (error) => {
       // this.toastrService.error('Server Error !!');
       this.toastrService.error('error de servidor  !!');
      }
    );
  }
//For creating new role and updating them
  createEditRole() {

    if(this.roleFormData.controls.roleId.value>0){
      this.roleFormData.patchValue({
        updatedBy: localStorage.getItem('UserID')
      })
    }
    this.apiService.postApi( 'Role/CreateUpadteRole',this.roleFormData.value).subscribe(
      (response: any) => {
        if (response.respCd === 200) {

          this.resetRoleDialog();
          this.loadLazy(this.prmGrid);
          this.toastrService.success(response.respMsg,'exito¡');
        }
        else{
          this.toastrService.warning(response.respMsg,'cuidado¡');
        }

      },
      (error) => {
         // this.toastrService.error('Server Error !!');
         this.toastrService.error('error de servidor  !!');
      }
    );
  }
//To get role pages for a particular role
  getRoleDetail(roleId:any) {
    this.apiService.getApi('Role/GetRoleDetail/' + roleId).subscribe(
      (response: any) => {

        this.pages = response;

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < response.length; i++) {
          let counter = 0;
          const obj = response[i];
          const childLength = obj.children.length;
          for (let j = 0; j < childLength; j++) {
            const newObj = obj.children[j];
            if (newObj.data.viewRight === true) {
              counter++;
              this.selectedNodes3.push(newObj);
            }
          }
          if (childLength === counter) {
            this.selectedNodes3.push(obj);
          }
        }



      },
      (error) => {

      }
    );
  }
  closePermissionModal() {
    this.permissionModal = false;
    this.selectedNodes3 = [];
    this.pages = [];
  }
  editPermission(data:any) {
    this.selectedRole = data;
    this.permissionModal = true;
    this.getRoleDetail(data.roleId);
  }
  showRoleDialog() {
    this.display = true;
    this.modalHeading = 'crear una posicion ';  // Create Role
    this.btnText = 'enviar';
    this.createForm();
  }
  editRoleDialog(Data: any) {
    let d = { ...Data };
    this.roleFormData.patchValue(d);
    this.display = true;
    this.modalHeading = 'actualizar posicion ';  //   Update Role
    this.btnText = 'actualizar';
  }
  resetRoleDialog() {
    this.display = false;
    this.createForm();
    // this.loadLazy(this.prmGrid);
  }

  getSelectedNodes(): any[] {
    const data: any[] = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selectedNodes3.length; i++) {
      const obj = data.find((o) => o.pageId === this.selectedNodes3[i].data.pageId);
      if (!obj) {
        data.push(this.selectedNodes3[i].data);
      }
      const parent = this.selectedNodes3[i].parent;
      if (parent) {
        const obj = data.find((o) => o.pageId === parent.data.pageId);
        if (!obj) {
          data.push(this.selectedNodes3[i].parent.data);
        }
      }
    }
    return data;
  }
//To give permission of different pages to roles
  handleAccessRights(): any {

    const data = this.getSelectedNodes();
    const roleUpdate: RoleManage = { roleId: this.selectedRole.roleId, updatedBy: 1, pages: data };
    this.apiService.postApi( 'Role/MapPageRole',roleUpdate).subscribe((response: any) => {
      if (response.responseCode === 200) {
        this.toastrService.success(response.responseMessage);
        this.closePermissionModal();
      } else {
        this.toastrService.warning(response.responseMessage);
      }
    });
  }
}