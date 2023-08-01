export interface GetRolesResponse {
  responseCode: string;
  responseMessage: string;
  data: Role[];
  totalRows: string;
}

export interface Role {
  roleId: number;
  roleName: string;
  remarks: string;
  isActive: boolean;
  updatedBy: string;
}
export class RoleManage {
  updatedBy: any;
  pages: RolePage[];
  roleId: number;
}
export class RolePage {
  roleId: number;
  pageId: number;
  pageName: string;
  controllerName: string;
  actionName: string;
  parentId: number;
  serialNo: number;
  isReport: boolean;
  rolePageId: number;
  viewRight: boolean;
  addRight: boolean;
  editRight: boolean;
  deleteRight: boolean;
}
