import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupUser } from '../model/signupUser';
import { PortalService } from '../portal.service';
@Component({
  selector: 'portal-app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class PortalResetPasswordComponent implements OnInit {
  resetFrom: FormGroup;
  UserId: any;
  newPswd: any;
  confirmPswd: any;
  password: any;
  user = new SignupUser;
  submitted = false;
  constructor(private route: ActivatedRoute, private _portalService: PortalService, private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.resetFrom = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: this.MustMatch('password', 'confirmPassword')
      });

    this.UserId = this.route.snapshot.params["id"];
    // this._portalService.GetUserById(id).subscribe((res: any) => {
    //   console.log(res);
    //   if (res.IsSuccess) {
    //     this.UserId = res.Result.UserId;
    //     this.user = res.Result;
    //   }
    // }, (err: HttpErrorResponse) => {
    //   console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    // });
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
    if (this.resetFrom.invalid) {
      return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.confirmForm.value))
    this.updatePassword(JSON.stringify(this.resetFrom.value));
  }
  updatePassword(item) {
    let password = JSON.parse(item).password;
    let obj = { UserId: this.UserId, Password: password };
    this._portalService.updatePassword(obj).subscribe((res: any) => {
      console.log(res);
      if (res.IsSuccess) {
        //put user detail in storage to use further....
        this.router.navigate(['/login']);
      }
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    });
  }
  get f() { return this.resetFrom.controls; }
}
