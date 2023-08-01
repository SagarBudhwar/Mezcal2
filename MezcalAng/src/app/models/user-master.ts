export class addUser {
    fname: string = '';
    lname: string = '';
    email: string = '';
    mobile: number = 0;
    password: any;
    confirmPassword: any;
    address: string = '';
    pincode: string = '';
    userType: string = '';
    state: string = '';
    district: string = '';
    city: string = '';
    isActive: boolean = false;
    reason:string = '';
}

export class UserProfile{
    UserName:string;
    LastName:string;
    Email:string;
    Mobile:string|number;
    UserType:string;
}