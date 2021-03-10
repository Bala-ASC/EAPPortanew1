import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PortalService } from '../portal.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-chaeckdomain',
  templateUrl: './chaeckdomain.component.html',
  styleUrls: ['./chaeckdomain.component.css']
})
export class ChaeckdomainComponent implements OnInit {
  private router: Router;
  message: string;
  private route: ActivatedRoute;
  loginForm: FormGroup;
  submitted = false;
  Email: any;
  showmsg = false;
  isLoad = false;
  public config: ToasterConfig =
    new ToasterConfig({
      timeout: 3000
    });
  signUpInfoEmail: any;
  private toasterService: ToasterService;
  constructor(private _portalService: PortalService, toasterService: ToasterService, private formBuilder: FormBuilder, _route: ActivatedRoute, _router: Router) {
    this.route = _route;
    this.router = _router;
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      DomainName: ['', Validators.required],
    });
    this.signUpInfoEmail = localStorage.getItem('signUpInfoEmail');
    this.Email = JSON.parse(this.signUpInfoEmail).email;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      //event.srcElement.elements['0'].focus();
      return;
    }
    else {
      this.isLoad = true;
      let obj = this.loginForm.get('DomainName').value;
      this._portalService.CheckDomainandclientserviceEnabled(obj)
        .subscribe((data: any) => {
          console.log(data);
          if (data.IsSuccess) {

            let signUpObj = { email: this.Email, DomainName: data.Result.DomainName, orgId: data.Result.OrganisationId, ACECustomerId: data.Result.ACECustomerId }
            localStorage.setItem('signUpInfo', JSON.stringify(signUpObj));
            this.isLoad = false;
            this.router.navigate(["/signup"]);
          }
          else {
            this.isLoad = false;
            this.message = data.Result;
            this.showmsg = true;
            return;
          }

        }, (err: HttpErrorResponse) => {
          console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
          this.isLoad = false;
        });
    }
  }
  get f() { return this.loginForm.controls; }
  closeModel() {
    this.showmsg = false;
  }

}
