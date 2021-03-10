import { Component, OnInit } from '@angular/core';
import { PortalService } from "../portal.service";
import { SignupUser } from "../model/signupUser";
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class PortalSignupComponent implements OnInit {
  txtbxvalue='Next';
  txtgrpbox=false;
  txtdivbox=false;
  txtdeptbox=false;
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
  registerForm: FormGroup;
  customerId: any;
  signupUser = new SignupUser();
  email: any;
  signUpInfo: any;
  isLoad=false;
  show1 = true;
  show2 = false;
  show3 = false;
  groups: any;
  divisions:[];
  departments: [];
  signUpForm: FormGroup;
  submitted1 = false;
  signUpForm2: FormGroup;
  submitted2 = false;
  employerSubmitted: boolean = false;
  candidateSubmitted: boolean = false;

  //minDate=new Date();
  maxDate =new Date();
  public config: ToasterConfig = 
new ToasterConfig({ 
    timeout: 3000
});
private toasterService: ToasterService;
  constructor(
    toasterService: ToasterService,private _portalService: PortalService, private formBuilder: FormBuilder
  ) {
    this.toasterService = toasterService;
   }

  ngOnInit() {
    //this.maxDate.setDate(this.maxDate.getDate() + 1);
    this.registerForm = this.formBuilder.group({
      employerGroup: this.formBuilder.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        MobileNo: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/\d/)]],
        Postcode: ['', [Validators.required,Validators.maxLength(4), Validators.pattern(/\d/)]],
        Gender: ['', Validators.required],
        DateOfBirth: ['', Validators.required],
      }),
      candidateGroup: this.formBuilder.group({
        Groupselect: ['', Validators.required],
        Divisionselect: ['', Validators.required],
        Departmentselect: ['', Validators.required],
      })
    });
    this.signupUser.GroupId="0";
    this.signupUser.DivisionId="0";
    this.signupUser.DeptId="0";
    this.signUpInfo = localStorage.getItem('signUpInfo');
    this.signupUser.Email = JSON.parse(this.signUpInfo).email;
    this.signupUser.OrganisationId = JSON.parse(this.signUpInfo).orgId;
    this.signupUser.DomainName=JSON.parse(this.signUpInfo).DomainName;
    this.signupUser.ACECustomerId=JSON.parse(this.signUpInfo).ACECustomerId;
    this.customerId = JSON.parse(this.signUpInfo).ACECustomerId;
    this.getGroup(this.customerId);
  }
  
  get employerGroup() {
    
    return this.registerForm.get('employerGroup');
  }

  get candidateGroup() {
    return this.registerForm.get('candidateGroup');
  }

 
  onchangeGender($event) {
    this.signupUser.Gender = $event.target.value;
  }
  onNext(index) {
 
    if (index == 1) {
      this.show1 = true;
      this.show2 = false;
      this.show3 = false;
    }
    if (index == 2) {
      this.employerSubmitted = true;
    if (this.registerForm.controls.employerGroup.invalid) {
      return;
    }
    else if(index==2 && this.txtbxvalue=='Register')
    {
      this.employerSubmitted = true;
      if (this.registerForm.controls.employerGroup.invalid) {
        return;
      }
      else{
        this.registration();
      }
    }
       else {
      this.show1 = false;
      this.show3 = false;
      this.show2 = true;
      this.getGroup(this.customerId);
       }
    }
    if (index == 3) {
      this.signupUser.DateOfBirth =new Date("1990-03-29T13:34:00.000")
      this.candidateSubmitted = true;
      if (this.registerForm.controls.candidateGroup.invalid) {
        return;
      }
       else {
        this.registration();
      }
    }
  }

  onGroupChange() {
    this.isLoad = true;
    this.signupUser.GroupId=this.registerForm.controls.candidateGroup.get('Groupselect').value;
    this.getDivisions(this.signupUser.GroupId);
    this.registerForm.controls.candidateGroup.get('Divisionselect').patchValue('');
    this.registerForm.controls.candidateGroup.get('Departmentselect').patchValue('');
    this.divisions=[];
    this.departments=[];
   
  }

  onDivisionChange() {
    this.isLoad = true;
    this.signupUser.DivisionId=this.registerForm.controls.candidateGroup.get('Divisionselect').value;
    this.getDepartments(this.signupUser.DivisionId);
    this.registerForm.controls.candidateGroup.get('Departmentselect').patchValue('');
    this.departments=[];
  }
  onStep1Next($event) {
    console.log($event);
  }
  onStep2Next($event) {
    console.log($event);
  }
  onStep3Next($event) {
    console.log($event);
  }
  onComplete($event) {
    console.log($event);
  }

  getGroup(customerId) {
    this.isLoad=true;
    this._portalService.GetGroups(customerId).subscribe((data: any) => {
      console.log(data);
      if (data.IsSuccess) {
        this.groups = data.Result;
        if(this.groups.length==0)
        {this.txtgrpbox=false; 
          this.txtbxvalue='Register';
          this.registerForm.controls.candidateGroup.get('Groupselect').setValidators(null); 
          this.registerForm.controls.candidateGroup.get('Groupselect').setErrors(null); 
          this.registerForm.controls.candidateGroup.get('Divisionselect').setValidators(null); 
          this.registerForm.controls.candidateGroup.get('Divisionselect').setErrors(null); 
          this.registerForm.controls.candidateGroup.get('Departmentselect').setValidators(null); 
          this.registerForm.controls.candidateGroup.get('Departmentselect').setErrors(null); 
          this.registerForm.controls.candidateGroup.get('Groupselect').patchValue("");
          this.registerForm.controls.candidateGroup.get('Divisionselect').patchValue("");
          this.registerForm.controls.candidateGroup.get('Departmentselect').patchValue("");
        }
       else{
        this.txtgrpbox=true; 
        this.registerForm.controls.candidateGroup.get('Groupselect').setValidators([Validators.required]);
        this.registerForm.controls.candidateGroup.get('Groupselect').updateValueAndValidity();
       

       }
      }
      this.isLoad=false;
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      this.isLoad=false;
    });
  }

  getDivisions(groupId) {
    this._portalService.GetDivisions(groupId).subscribe((data: any) => {
      console.log(data);
      if (data.IsSuccess) {
        this.divisions = data.Result;
        if(this.divisions.length==0)
        {
          this.txtdivbox=false;
          this.txtdeptbox=false;
          this.registerForm.controls.candidateGroup.get('Divisionselect').setValidators(null); 
          this.registerForm.controls.candidateGroup.get('Divisionselect').setErrors(null); 
          this.registerForm.controls.candidateGroup.get('Departmentselect').setValidators(null); 
          this.registerForm.controls.candidateGroup.get('Departmentselect').setErrors(null); 
          this.registerForm.controls.candidateGroup.get('Divisionselect').patchValue("");
          this.registerForm.controls.candidateGroup.get('Departmentselect').patchValue("");
        }
        else{
          this.txtdivbox=true;
          this.registerForm.controls.candidateGroup.get('Divisionselect').setValidators([Validators.required]);
          this.registerForm.controls.candidateGroup.get('Divisionselect').updateValueAndValidity();
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
      console.log(res);
      if (res.IsSuccess) {
        this.departments = res.Result;
        if(this.departments.length==0)
        {
          this.txtdeptbox=false;
          this.registerForm.controls.candidateGroup.get('Departmentselect').setValidators(null); 
          this.registerForm.controls.candidateGroup.get('Departmentselect').setErrors(null); 
          this.registerForm.controls.candidateGroup.get('Departmentselect').patchValue("");
        }
        else{
          this.txtdeptbox=true;
          this.registerForm.controls.candidateGroup.get('Departmentselect').setValidators([Validators.required]);
          this.registerForm.controls.candidateGroup.get('Departmentselect').updateValueAndValidity();
        }
      }
      this.isLoad=false;
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      this.isLoad=false;
    });
  }
  get fe() { return (<FormGroup>this.registerForm.get('employerGroup')).controls; }

  get fc() { return (<FormGroup>this.registerForm.get('candidateGroup')).controls; }
  public matcher(event) {
    const allowedRegex = /[0-9]/g;
  
    if (!event.key.match(allowedRegex)) {
        event.preventDefault();
    }
  
  }
  registration(){
    this.signupUser.FirstName=this.registerForm.controls.employerGroup.get('FirstName').value;
    this.signupUser.LastName=this.registerForm.controls.employerGroup.get('LastName').value;
    this.signupUser.MobileNo=this.registerForm.controls.employerGroup.get('MobileNo').value;
    this.signupUser.Postcode=this.registerForm.controls.employerGroup.get('Postcode').value;
    this.signupUser.Gender=this.registerForm.controls.employerGroup.get('Gender').value;
    this.signupUser.DateOfBirth=(this.registerForm.controls.employerGroup.get('DateOfBirth').value).toDateString();
    this.signupUser.GroupId=this.registerForm.controls.candidateGroup.get('Groupselect').value;
    this.signupUser.DivisionId=this.registerForm.controls.candidateGroup.get('Divisionselect').value;
    this.signupUser.DeptId=this.registerForm.controls.candidateGroup.get('Departmentselect').value;
    this.isLoad = true;
    this._portalService.SignupCounsellor(this.signupUser).subscribe((response: any) => {
   if (response.IsSuccess) {
     this.show1 = false;
     this.show3 = true;
     this.show2 = false;

   }
   else {

     this.toasterService.pop('error', response.Result, );
   }
 this.isLoad = false;
 }, (err: HttpErrorResponse) => {
  console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
  this.isLoad = false;
 });
  }
}
