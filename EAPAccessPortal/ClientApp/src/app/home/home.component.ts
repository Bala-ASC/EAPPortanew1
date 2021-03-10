import { Component, OnInit, ViewChild } from '@angular/core';
//import { ToasterService, ToasterConfig } from '';
import { HttpErrorResponse } from '@angular/common/http';
//import { UserService } from '/';
//import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { CryptoJS } from 'crypto-js'
import { PortalService } from "../portal.service";
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // styleUrls: ['../../../assets/css/custom.css'],
  providers: []
})
export class PortalHomeComponent implements OnInit {
  public config: ToasterConfig = 
new ToasterConfig({ 
    timeout: 3000
});
private toasterService: ToasterService;
  userId: any;
  submitted = false;
  isLoad = false;
  signUpForm: FormGroup;
  //encryptedEmail:any;

  constructor(toasterService: ToasterService,private router: Router,private _portalService: PortalService, private formBuilder: FormBuilder//, toasterService: ToasterService
    // ,private _signupService: SignupService 


  ) {
    this.toasterService = toasterService;
  }

  ngOnInit() {

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      // alert('please enter valid user name and password.')
       return;
     }


    let obj = this.signUpForm.value.email;
this.isLoad=true;
    this._portalService.checkemailduplication(obj).subscribe((data: any) => {
      console.log(data);
      if (data.Result=='Email not Exists') { 
        this.next(obj); 
      
        
      }
      else if(data.Result=='Email Already Exists')
      {
        this.toasterService.pop('error', '', data.Result);
        this.isLoad=false;
        return;
      }
      
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      this.isLoad=false;
    });


   //this.router.navigate(["/signup"]);
  


    
  }
  next(obj)
  {
    this._portalService.CheckDomain(obj).subscribe((data: any) => {
      console.log(data);
      if (data.Result!=null) {    
        localStorage.clear();   
        let signUpObj={email:this.signUpForm.value.email,orgId:data.Result.OrganisationId,ACECustomerId:data.Result.ACECustomerId,DomainName:data.Result.DomainName}
        localStorage.setItem('signUpInfo', JSON.stringify(signUpObj));
        this.router.navigate(["/signup"]);
      }
      else{
        let objemail={email:this.signUpForm.value.email}
        localStorage.setItem('signUpInfoEmail', JSON.stringify(objemail));  
        this.router.navigate(["/checkdomain"]);   
      //this.toasterService.pop('error', '', data.Message);
      }
      this.isLoad=false;
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      this.isLoad=false;
    });
  }
  
  get f() { return this.signUpForm.controls; }
}
