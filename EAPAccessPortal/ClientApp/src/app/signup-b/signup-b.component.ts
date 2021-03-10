import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupUser } from '../model/signupUser';
import { PortalService } from '../portal.service';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-signup-b',
  templateUrl: './signup-b.component.html',
  styleUrls: ['./signup-b.component.css']
})
export class PortalSignupBComponent implements OnInit {
  showMsg=false;
  showForm=false;
  confirmForm: FormGroup;
  UserId: any;
  newPswd: any;
  confirmPswd: any;
  // password: any;
  id:any;
  user: any;
  submitted = false;
  public config: ToasterConfig = 
  new ToasterConfig({ 
      timeout: 3000
  });
  private toasterService: ToasterService;
  constructor(private route: ActivatedRoute,toasterService: ToasterService, private _portalService: PortalService, private formBuilder: FormBuilder,
    private router: Router) { 
      this.toasterService = toasterService;
      this.id = this.route.snapshot.params["id"];
    }

  ngOnInit() {
    this.CheckUrlisExpiredOrNot();
    this.confirmForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: this.MustMatch('password', 'confirmPassword')
      });


    this._portalService.GetUserById(this.id).subscribe((res: any) => {
      console.log(res);
      if (res.IsSuccess) {
        this.UserId = res.Result.UserId;
        this.user = res.Result;
        
        localStorage.setItem('UserDetails', JSON.stringify(res.Result));
      }
      else{
        this.toasterService.pop('error', '', 'Invalid User');
      }
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    });
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.confirmForm.invalid) {
      return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.confirmForm.value))
    this.confirmCounsellor(JSON.stringify(this.confirmForm.value));
  }
  confirmCounsellor(confirm) {
    let password = JSON.parse(confirm).password;
    let obj = { id: this.UserId, pswd: password };
    this._portalService.ConfirmCounsellor(obj).subscribe((res: any) => {
      console.log(res);
      if (res.IsSuccess) {
        this.user = res.Result;
        localStorage.clear();
            localStorage.setItem('UserDetails', JSON.stringify(this.user));
            localStorage.setItem('ProfilePhoto', JSON.stringify(this.user.ProfilePhoto));
        //put user detail in storage to use further....
        this.router.navigate(['/dashboard']);
      }
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    });
  }
  get f() { return this.confirmForm.controls; }
  CheckUrlisExpiredOrNot()
  {
  this._portalService.CheckUserIsActive(this.id)
  .subscribe((data: any) => {
    console.log(data);
    if (data.IsSuccess) {
     if(data.Result)
     {
       this.showMsg=true;
       this.showForm=false;
     }
     else if(!data.Result)
     {
      this.showMsg=false;
      this.showForm=true;
     }
    }
  }, (err: HttpErrorResponse) => {
    console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
  });
}
}
