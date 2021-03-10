import { Component, OnInit, ViewChild} from '@angular/core';
import { User } from '../Counsellor/counsellor-my-profile/user';
import { CounsellorMyProfileService } from '../Counsellor/counsellor-my-profile/counsellor-my-profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SignupUser } from 'src/app/model/signupUser';
import { PortalService } from 'src/app/portal.service';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { CommonServiceService } from '../common-service.service';
import { DasboardHomeService } from '../dasboard-home.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],

})
export class MyProfileComponent implements OnInit {
  txtgrpbox=false;
  txtdivbox=false;
  txtdeptbox=false;
  showquataEmptymsg=false;
  invalidpostcode:boolean=false;
  ClientDashboardSessions: any;
  uploadimage:boolean=false;
  revertImage:string;
  public today = new Date();
  imgURL: string = '';
  user= new User();
  imgType: boolean = false;
  FileType:any;
  picture: any;
  fileToUpload: File;
  files: any;
  noImage: boolean = true;
  bsValue: Date = new Date();
  isLoad:boolean=false;
btntextvalue: string='Edit';
isRequired: boolean = false;
btntext: boolean = false;
signupUser = new SignupUser();
signUpInfo: any;
customerId: any;
groups: any;
divisions: [];
registerForm: FormGroup;
removeImage:boolean=false;
employerSubmitted: boolean = false;
departments: [];
public config: ToasterConfig =
new ToasterConfig({
    timeout: 3000
});
private toasterService: ToasterService;
private counsellorMyProfileService: CounsellorMyProfileService;
private commonServiceService:CommonServiceService;
  constructor(private datePipe: DatePipe,private dasboardHomeService: DasboardHomeService,toasterService: ToasterService,_counsellorMyProfileService: CounsellorMyProfileService,private _portalService: PortalService,private router: Router, private formBuilder: FormBuilder,_commonServiceService:CommonServiceService) {
    this.counsellorMyProfileService=_counsellorMyProfileService;
    this.toasterService = toasterService;
    this.commonServiceService=_commonServiceService;
    this.user = JSON.parse(localStorage.getItem('UserDetails'));
    if(this.user.RoleId!=(1 || 2))
    {
      this.router.navigate(['/login']);
    }
  }
  @ViewChild('myModal') myModal;
  ngOnInit() {
    this.changeName();
    this.uploadimage=false;
    this.removeImage=false;
    this.user = JSON.parse(localStorage.getItem('UserDetails'));
    this.GetUserDetail(this.user.UserId);
    this.btntextvalue = "Edit";
    this.isRequired= true;
    this.registerForm = this.formBuilder.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        MobileNo: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/\d/)]],
        Postcode: ['', [Validators.required,Validators.maxLength(4),Validators.pattern(/\d/)]],
         Gender: ['', Validators.required],
        DateOfBirth: ['', Validators.required],
        Groupselect: [''],
        Divisionselect: [''],
        Departmentselect: ['', ],
        City:['', Validators.required],
        State:['', Validators.required],
    });
  }


  GetUserDetail(UserId)
  {
    this.isLoad=true;
    this.counsellorMyProfileService.GetUserDetailById(UserId)
    .subscribe((data: any) => {
      if(data.IsSuccess){
        this.user = data.Result;
        this.revertImage=this.user.ProfilePhoto;
        if(this.user.ProfilePhoto!=null)
        {
          this.removeImage=true;
        }
        debugger;
        //let newdate=this.datePipe.transform(this.user.DateOfBirth, 'dd-MM-yyyy'); 
        // this.user.DateOfBirth = new Date(newdate); 
        this.registerForm.get('FirstName').patchValue(this.user.FirstName);
        this.registerForm.get('LastName').patchValue(this.user.LastName);
         this.registerForm.get('MobileNo').patchValue(this.user.MobileNo);
        this.registerForm.get('Postcode').patchValue(this.user.PostCode);
        this.registerForm.get('DateOfBirth').patchValue(new Date(this.user.DateOfBirth));
        this.registerForm.get('Groupselect').patchValue(this.user.ClientOrgGroupId);
        this.registerForm.get('Divisionselect').patchValue(this.user.ClientOrgDivisionId);
        this.registerForm.get('Departmentselect').patchValue(this.user.ClientOrgDepartmentId);
        this.registerForm.get('Gender').patchValue(this.user.Gender);
        this.registerForm.get('City').patchValue(this.user.City);
        this.registerForm.get('State').patchValue(this.user.State);
        localStorage.setItem('ProfilePhoto', JSON.stringify(this.user.ProfilePhoto));
        localStorage.setItem('UserDetails', JSON.stringify(this.user));
        this.getGroup(this.user.ACECustomerId);
        this.getDivisions(this.user.ClientOrgGroupId);
        this.getDepartments(this.user.ClientOrgDivisionId);
        this.changeprofile(this.user.ProfilePhoto);
      }
      this.isLoad=false;
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      this.isLoad=false;
    });
  }


  getGroup(customerId) {
    this._portalService.GetGroups(customerId).subscribe((data: any) => {
      console.log(data);
      if (data.IsSuccess) {
        this.groups = data.Result;
        if(this.groups.length==0)
        {this.txtgrpbox=false;
          this.registerForm.get('Groupselect').setValidators(null);
this.registerForm.get('Groupselect').setErrors(null);
this.registerForm.get('Divisionselect').setValidators(null);
this.registerForm.get('Divisionselect').setErrors(null);
this.registerForm.get('Departmentselect').setValidators(null);
this.registerForm.get('Departmentselect').setErrors(null);
          this.registerForm.get('Groupselect').patchValue("");
          this.registerForm.get('Divisionselect').patchValue("");
          this.registerForm.get('Departmentselect').patchValue("");
        }
       else{
        this.txtgrpbox=true;
        this.registerForm.get('Groupselect').setValidators([Validators.required]);
        this.registerForm.get('Groupselect').updateValueAndValidity();


       }
      }
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    });
  }

  getDivisions(groupId) {

    this._portalService.GetDivisions(groupId).subscribe((data: any) => {
      if (data.IsSuccess) {
        this.divisions = data.Result;
        if(this.divisions.length==0)
        {
          this.txtdivbox=false;
          this.txtdeptbox=false;
          this.registerForm.get('Divisionselect').setValidators(null);
this.registerForm.get('Divisionselect').setErrors(null);
this.registerForm.get('Departmentselect').setValidators(null);
this.registerForm.get('Departmentselect').setErrors(null);
          this.registerForm.get('Divisionselect').patchValue("");
          this.registerForm.get('Departmentselect').patchValue("");
        }
        else{
          this.txtdivbox=true;
          this.registerForm.get('Divisionselect').setValidators([Validators.required]);
        this.registerForm.get('Divisionselect').updateValueAndValidity();
        }
      }
      this.isLoad=false;
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      this.isLoad=false;
    });

  }

  getDepartments(divisionId) {

    this._portalService.GetDepartments(divisionId).subscribe((res: any) => {
      if (res.IsSuccess) {
        this.departments = res.Result;
        if(this.departments.length==0)
        {
          this.txtdeptbox=false;
          this.registerForm.get('Departmentselect').setValidators(null);
this.registerForm.get('Departmentselect').setErrors(null);
          this.registerForm.get('Departmentselect').patchValue("");
        }
        else{
          this.txtdeptbox=true;
            this.registerForm.get('Departmentselect').setValidators([Validators.required]);
        this.registerForm.get('Departmentselect').updateValueAndValidity();
        }
      }
      this.isLoad=false;
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      this.isLoad=false;
    });

  }

onGroupChange() {
  this.isLoad=true;
  this.user.ClientOrgGroupId=this.registerForm.get('Groupselect').value;
  this.getDivisions(this.user.ClientOrgGroupId);
  this.registerForm.get('Divisionselect').patchValue('');
  this.registerForm.get('Departmentselect').patchValue('');
  this.user.ClientOrgDivisionId='';
  this.user.ClientOrgDepartmentId='';
  this.divisions=[];
    this.departments=[];

}

onDivisionChange() {
  this.isLoad=true;
  this.user.ClientOrgDivisionId=this.registerForm.get('Divisionselect').value;
  this.getDepartments(this.user.ClientOrgDivisionId);
  this.registerForm.get('Departmentselect').patchValue('');
  this.user.ClientOrgDepartmentId='';
    this.departments=[];

}
updateprofile() {

  if (this.btntextvalue == "Edit") {
    this.btntextvalue = "Save";
    this.isRequired = false;

    return;
  }
  this.employerSubmitted = true;
  if (this.registerForm.invalid) {
    return;
  }
  this.isLoad=true;
  this.user.FirstName=this.registerForm.get('FirstName').value;
  this.user.LastName=this.registerForm.get('LastName').value;
  this.user.MobileNo=this.registerForm.get('MobileNo').value;
  this.user.PostCode=this.registerForm.get('Postcode').value;
  //this.signupUser.Gender=this.registerForm.controls.employerGroup.get('Gender').value;
  this.user.DateOfBirth=(this.registerForm.get('DateOfBirth').value).toDateString();
  this.user.ClientOrgGroupId=this.registerForm.get('Groupselect').value;
  this.user.ClientOrgDepartmentId=this.registerForm.get('Departmentselect').value;
  this.user.ClientOrgDivisionId=this.registerForm.get('Divisionselect').value;
  this.user.Gender=this.registerForm.get('Gender').value;
  this.user.City=this.registerForm.get('City').value;
  this.user.State=this.registerForm.get('State').value;
  this.invalidpostcode=false;
  this.user.CreatedBy = this.user.UserId;
  this.user.removeImage=this.removeImage;
  if(this.uploadimage)
  this.uploadphoto1();
  this.counsellorMyProfileService.UpdateProfile(this.user)
    .subscribe((data: any) => {
      console.log(data);
      if (data.IsSuccess) {
       this.toasterService.pop('success', '', 'Record Updated Successfully');
        this.isRequired=true;
        this.btntextvalue = "Edit";
        this.GetUserDetail(this.user.UserId);

      }
      this.isLoad=false;
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      this.isLoad=false;
    });
    this.removeImage=false;
    this.uploadimage=false;
}
logOut()//[routerLink]="['/login']"
{
  localStorage.clear();
  this.router.navigate(['/login']);

}

selectPhoto1(file: FileList) {
  this.picture = file.item(0).name;
  this.fileToUpload = file.item(0);
  const File = this.fileToUpload.name;
  //this.contentAreas.FileName = File.split('.')[0];
  this.files = File.split('.');
  this.user.FileType = this.files[this.files.length - 1];
  var regex = new RegExp("(jpg|png|jpeg)$");
  if (regex.test(this.user.FileType.toLowerCase())) {
  }
  else {
    //this.imgType = true;
    this.toasterService.pop('error', '', 'file type must be jpg,png or jpeg');
    return;
  }
  this.noImage = false;

  const reader = new FileReader();
  reader.onload = (event: any) => {
    this.imgURL = event.target.result;
    this.user.ProfilePhoto=this.imgURL;
    var image = new Image();
    this.removeImage=true;
    this.uploadimage=true;
    //this.uploadphoto1();
  };


  reader.readAsDataURL(this.fileToUpload);


}
uploadphoto1()
  {
    if (this.imgURL != '')
    this.user.Base64Data = this.imgURL.split(',')[1];
    this.counsellorMyProfileService.updatephoto(this.user)
      .subscribe((data: any) => {
        console.log(data);
        if (data.IsSuccess) {
         // this.toasterService.pop('success', '', 'Photo uploaded successfully');
          this.GetUserDetail(this.user.UserId);


        }
      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  removeimage()
  {
    $("#file-input1").val('');
  this.removeImage=false;
 this.user.ProfilePhoto=null;
 this.uploadimage=true;
 this.imgURL= '';
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
     // this.invalidpostcode=false;
      return false;
    }
    else if(this.user.PostCode.length>3)
    {
     // this.invalidpostcode=true;
    return false;
    }
    else

    return true;



  }
  get fe() { return this.registerForm.controls; }
  changeName() {
    this.commonServiceService.change(0);
  }
changeprofile(profilename)
{
  this.commonServiceService.changeprofile(profilename);
}
onchangeGender($event) {
  this.user.Gender = $event.target.value;
}
makebooking() {
  this.isLoad=true;
    this.dasboardHomeService.GetClientDashboard(this.user.UserId, this.user.ACEClientId)
      .subscribe((response: any) => {
        if (response) {
          this.ClientDashboardSessions = response.Result;
          if((this.ClientDashboardSessions.AllowedAppts-this.ClientDashboardSessions.UsedAppts)==0)
          {
            this.isLoad=false;
            this.showquataEmptymsg=true;
            return;
          }
          else{

            this.isLoad=false;
            this.router.navigate(["/dashboard/booking"]);

          }
        }
        else {
          this.isLoad=false;
          this.showquataEmptymsg=true;

          return;
        }

      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        this.isLoad=false;
      });
  }
  closeModel() {
    this.showquataEmptymsg= false;
 }
 public matcher(event) {
  const allowedRegex = /[0-9]/g;

  if (!event.key.match(allowedRegex)) {
      event.preventDefault();
  }
}
ClickInstantchattop(){
  window.location.href='/dashboard/chatroom';
 }



}
