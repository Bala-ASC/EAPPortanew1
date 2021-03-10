import { Component, OnInit } from '@angular/core';
import { User } from './user';

import { CounsellorMyProfileService } from './counsellor-my-profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SignupUser } from 'src/app/model/signupUser';
import { PortalService } from 'src/app/portal.service';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-counsellor-my-profile',
  templateUrl: './counsellor-my-profile.component.html',
  styleUrls: ['./counsellor-my-profile.component.css'],

})
export class CounsellorMyProfileComponent implements OnInit {
user= new User();
btntextvalue: string;
isRequired: boolean = false;
btntext: boolean = false;
signupUser = new SignupUser();
signUpInfo: any;
customerId: any;
groups: any;
divisions: any;
departments: any;
bsValue: Date = new Date();
private commonServiceService:CommonServiceService;
private counsellorMyProfileService: CounsellorMyProfileService;

  constructor(_counsellorMyProfileService: CounsellorMyProfileService,private _portalService: PortalService,private router: Router,_commonServiceService:CommonServiceService) { 
    this.counsellorMyProfileService=_counsellorMyProfileService;
    this.commonServiceService=_commonServiceService;
    this.user = JSON.parse(localStorage.getItem('UserDetails'));
    if(this.user.RoleId!=5)
    {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.changeName();
    this.user = JSON.parse(localStorage.getItem('UserDetails'));
    this.GetUserDetail(this.user.UserId);
    this.btntextvalue = "Edit"
    this.isRequired= true;
  }
  GetUserDetail(UserId)
  {
    this.counsellorMyProfileService.GetUserDetailById(UserId)
    .subscribe((data: any) => {
      if (data.IsSuccess) {
        this.user = data.Result;
        this.getGroup(this.user.ACECustomerId);
        this.onGroupChange();
        this.onDivisionChange()

      }
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    });
  }
  
  getGroup(customerId) {
    this._portalService.GetGroups(customerId).subscribe((data: any) => {
      console.log(data);
      if (data.IsSuccess) {
        this.groups = data.Result;
      }
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    });
  }

  getDivisions(groupId) {
    this._portalService.GetDivisions(groupId).subscribe((data: any) => {
      console.log(data);
      if (data.IsSuccess) {
        this.divisions = data.Result;
      }
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    });
  }

  getDepartments(divisionId) {
    this._portalService.GetDepartments(divisionId).subscribe((res: any) => {
      console.log(res);
      if (res.IsSuccess) {
        this.departments = res.Result;
      }
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    });
  }
 
onGroupChange() {

  this.getDivisions(this.user.ClientOrgGroupId);
}

onDivisionChange() {

  this.getDepartments(this.user.ClientOrgDivisionId);
}
updateprofile() {
  if (this.btntextvalue == "Edit") {
    this.btntextvalue = "Save";
    this.isRequired = false;
    return
  }
  this.user.CreatedBy = this.user.UserId;
  this.counsellorMyProfileService.UpdateProfile(this.user)
    .subscribe((data: any) => {
      console.log(data);
      if (data.IsSuccess) {
       // this.toasterService.pop('success', '', 'Record updated Successfully');
        this.btntextvalue = "Edit";
        this.isRequired=true;
        this.GetUserDetail(this.user.UserId);
      }
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    });
}
logOut()//[routerLink]="['/login']"
{
  localStorage.clear();
  window.location.href='/login';
  //this.router.navigate(['/login']);

}
changeName() {
  this.commonServiceService.change(0);
}
updateIsLive()
{
this.counsellorMyProfileService.updateIsLive(this.user.UserId,this.user.IsLive)
.subscribe((data: any) => {
  console.log(data);
  if (data.IsSuccess) {
   // this.toasterService.pop('success', '', 'Record updated Successfully');
    this.btntextvalue = "Edit";
    this.isRequired=true;
    this.GetUserDetail(this.user.UserId);
  }
}, (err: HttpErrorResponse) => {
  console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
});
}

}
