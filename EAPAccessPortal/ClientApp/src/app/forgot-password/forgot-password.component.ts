import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PortalService } from '../portal.service';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
@Component({
  selector: 'portal-app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class PortalForgotPasswordComponent implements OnInit {
  public config: ToasterConfig = 
  new ToasterConfig({ 
      timeout: 3000
  });
  private toasterService: ToasterService;
  email:any;
user:any;
showMsg=false;
showForm=true;
submitted = false;
forgotFrom: FormGroup;
  constructor(toasterService: ToasterService,private _portalService: PortalService, private router: Router, private formBuilder: FormBuilder) 
  {
    this.toasterService = toasterService;
   }

  ngOnInit() {
    this.forgotFrom = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/)]],    
    });
  }
  send()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotFrom.invalid) {

      return;
    }
    else {
      //  this.authentication.Email = this.loginForm.get('email').value;
      //  this.authentication.Password=this.loginForm.get('passWord').value;
      let object={
        'Email':this.forgotFrom.get('email').value,
     }
       this._portalService.ForgetPassword(object)
       .subscribe((data: any) => {      
         if (data.IsSuccess) {
          
            this.showMsg=true;
            this.showForm=false;
           this.toasterService.pop('success', '', 'Mail Sent Successfully');        
           }
           
          else
           {

             this.toasterService.pop('error', '', data.Result);
           }
         
       }, (err: HttpErrorResponse) => {   
         console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
       });
    }
  
  }
  get f() { return this.forgotFrom.controls; }
}
