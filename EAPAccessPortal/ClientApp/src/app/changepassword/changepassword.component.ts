import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PortalService } from '../portal.service';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  Password;
  UserId: string;
  ConfirmPassword;
  email:any;
  user:any;
  GUID:any;
  showMsg=false;
  showForm=false;
  submitted = false;
  forgotFrom: FormGroup;
  private router: Router;
  private route: ActivatedRoute;
  public config: ToasterConfig =
    new ToasterConfig({
      timeout: 3000
    });
  private toasterService: ToasterService;
    constructor(private _portalService: PortalService,toasterService: ToasterService, private formBuilder: FormBuilder,_route: ActivatedRoute, _router: Router) {
      this.route = _route;
      this.router = _router;
      this.UserId=this.route.snapshot.params["id1"];
      this.GUID=this.route.snapshot.params["id2"];
      this.toasterService = toasterService;
      // console.log(this.route.url);
      // this.UserId = this.route.snapshot.children[0].url[1].path;
     }
  
    ngOnInit() {
      this.forgotFrom = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],    
      });
this.CheckUrlisExpiredOrNot();

    }
    send()
    {
      this.submitted = true;
  
      if (this.Password == this.ConfirmPassword) {
        var forgotpassword = {};
        forgotpassword['UserId'] = this.UserId;
        forgotpassword['Password'] = this.Password;
        this._portalService.updatePassword(forgotpassword)
          .subscribe((data: any) => {
            console.log(data);
            if (data.IsSuccess) {
              this.toasterService.pop('success', '', 'Password Changed Successfully');
              this.router.navigate([`/login`]);
            }
          }, (err: HttpErrorResponse) => {
            console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
          });
  
      }
      else {
        this.toasterService.pop('error', '', 'Passwords do not match');
       
      }
    
    }
    CheckUrlisExpiredOrNot()
    {
    this._portalService.CheckUrlisExpiredOrNot(this.UserId,this.GUID)
    .subscribe((data: any) => {
      console.log(data);
      if (data.IsSuccess) {
       if(data.Message=='Expired')
       {
         this.showMsg=true;
         this.showForm=false;
       }
       else if(data.Message=='Unexpired')
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