import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

import { PortalService } from '../portal.service';
@Component({
  selector: 'portal-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class PortalLoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoad=false;
  submitted = false;
  user: any;
  returnUrl:string;
  public config: ToasterConfig =
    new ToasterConfig({
      timeout: 3000
    });
  private toasterService: ToasterService;
  constructor( private route: ActivatedRoute,toasterService: ToasterService, private _portalService: PortalService, private router: Router, private formBuilder: FormBuilder, ) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/)]],
      passWord: ['', Validators.required],
    });

    //this.toasterService.pop('State','t','tt');

  }
  login(event) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      // alert('please enter valid user name and password.')
      event.srcElement.elements['0'].focus();
      return;
    }
    else {
      this.isLoad=true;
      let obj = { Email: this.loginForm.get('email').value, Password: this.loginForm.get('passWord').value }
      this._portalService.UserLogin(obj)
        .subscribe((data: any) => {
          console.log(data);
          if (data.IsSuccess) {
            this.user = data.Result;
            if(this.user.RoleId==2)
            {
              this.user.RoleId=1;
            }
            localStorage.clear();
            localStorage.setItem('UserDetails', JSON.stringify(this.user));
            localStorage.setItem('ProfilePhoto', JSON.stringify(this.user.ProfilePhoto));
            //window.location.href='/admin/dashboard';
            //this.toasterService.pop('success', 'Success Toaster', 'Login Successfully');
            if (this.user.RoleId == 5) {
              this.toasterService.pop('success', '', 'Login Successfully');
              if(this.returnUrl=='/'||this.returnUrl==undefined)
              this.router.navigate(['/dashboard-counsellor']);
              else
              this.router.navigateByUrl(this.returnUrl);
              
            }
            else if (this.user.RoleId==1||this.user.RoleId==2) {
              debugger;
              if(this.user.ACEClientId==null||this.user.ACEClientId==undefined)
              {
                this.router.navigate(['/updateuerinfo']);
              }
              else{
              this.toasterService.pop('success', '', 'Login Successfully');
                // login successful so redirect to return url
                if(this.returnUrl=='/'||this.returnUrl==undefined)
                this.router.navigate(['/dashboard']);
                else
                this.router.navigateByUrl(this.returnUrl);
             //this.router.navigate(['/dashboard']);
              }

            }
           
            else {
              this.isLoad=false;
              this.toasterService.pop('error', '', data.Message);
            }
          }
          else {
            this.isLoad=false;
            this.toasterService.pop('error', '', data.Message);
          }
          this.isLoad=false;
        }, 
        (err: HttpErrorResponse) => {
          console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
          this.isLoad=false;
        });
    }
  }
  get f() { return this.loginForm.controls; }

}
