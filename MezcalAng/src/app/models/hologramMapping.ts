export class addHologramMapping {
    productCode:string = '';
    productName:string = '';
    fromNo: number = 0;
    toNo: number = 0;
    quantity: number = 0;
    isActive: boolean = false;
    reason: string = '';
}


export class Mapping {
    ID: number;
    ProductID: number;
    HologramID: number;
    Prefix: string;
    FromNumber: string;
    ToNumber: string;
    BatchNo: string;
    BatchDate: string;
    OrganisationID: string;
    Organisation: string;
    Quantity: string;
    OracleCode: string;
    CreatedBy: number;
    CreatedDate: string;
    IsActive: boolean;
    Name: string;
    PackSize: number;
    ProductName: string;
  }