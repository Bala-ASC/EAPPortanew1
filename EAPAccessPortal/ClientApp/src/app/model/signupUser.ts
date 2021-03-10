export class SignupUser {
    FirstName:string;
    LastName:string;    
    DateOfBirth:Date;
    Email:string;
    Gender:string;
    GroupId:string;
    DivisionId:string;
    OrganisationId:number;  
    DeptId:any;
    MobileNo: string;
    Postcode:string;
    DomainName:string;
    ACECustomerId:string;
    constructor() {
        this.FirstName=null;
        this.LastName=null;
        this.Email=null;
        this.OrganisationId = null;      
        this.MobileNo = null;
        this.Postcode=null;
    }
}