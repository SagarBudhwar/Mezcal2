export interface User {

    responseCode : number,
    responseMessage : string,
    responseData: LoginResp,
    responseDataRolePages: LoginRespRolePages[]
   
}


export class LoginResp{
    userId : number;
    username: string;
    email:string;
    mobile:string;
    accessType:number;
    roleId:number;
    token: string;
    userType:string;
    isActive:boolean;
    refreshToken:string;
    accessToken:string;
    respCd:string;
    respMsg:string;
}

export class LoginRespRolePages{
    mapRolePageId : number;
    pageId:number;
    roleId:number;
}

export interface LoginResponse{
    userId : number;
    userName: string;
    token: string;
    email:string
}