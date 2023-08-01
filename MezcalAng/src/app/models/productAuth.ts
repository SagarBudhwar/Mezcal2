export class ProductAuth {
    uid: string = "";
    verifiedByWhom: string = "";
    mobileNumber: string = "";
    emailId: string = ""; 
    longitude:string="";    
    latitude:string="";    
    verificationType:string="";    
    verificationMode:string="";    
    city:string="";    
    state:string="";    
    country:string="";    
    address:string="";    
    pincode:string = "";                              
  }
  export class ProductAuthResponse {
    productCode: string = "";
    productId: number = 0;
    productName: string = "";
    description:string= "";
    tollNo: string = "";
    productGuide: string = "";
    totalRatingCount:string= "";
    productRating: string="";
    batchNumber:string= "";
    feedbackId: number = 0;
    imageURL:string="";
    responseMessage: string = "";
    responseCode: string = "";
  }
  

  
  
  export class Feedback {
    
    feedbackId: number;
    feedback: string = "";
    name: string = "";
    mobileNumber: string = "";
    emailId: string = ""; 
    responseCode: string = "";
    responseMessage: string = "";
  }
  