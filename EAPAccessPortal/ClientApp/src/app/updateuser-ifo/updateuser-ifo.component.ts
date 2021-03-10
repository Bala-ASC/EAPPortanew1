import { Component, OnInit } from '@angular/core';
import { PortalService } from "../portal.service";
import { SignupUser } from "../model/signupUser";
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
import { User } from '../Counsellor/counsellor-my-profile/user';
@Component({
  selector: 'app-updateuser-ifo',
  templateUrl: './updateuser-ifo.component.html',
  styleUrls: ['./updateuser-ifo.component.css']
})
export class UpdateuserIfoComponent implements OnInit {
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
  isLoad:boolean=false;
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
  signUpInfoEmail:any;
  user=new User();
  //minDate=new Date();
  maxDate =new Date();
  public config: ToasterConfig = 
new ToasterConfig({ 
    timeout: 3000
});
  private toasterService: ToasterService;
  constructor(
    toasterService: ToasterService,private _portalService: PortalService, private formBuilder: FormBuilder,private router: Router
  ) { 
    this.toasterService = toasterService;
  }

  ngOnInit() {
    //this.maxDate.setDate(this.maxDate.getDate() + 1);
    this.registerForm = this.formBuilder.group({
      employerGroup: this.formBuilder.group({
        // FirstName: ['', Validators.required],
        // LastName: ['', Validators.required],
        MobileNo: ['',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/\d/)]],
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
    this.user.ClientOrgGroupId="0";
    this.user.ClientOrgDivisionId="0";
    this.user.ClientOrgDepartmentId="0";
    this.user = JSON.parse(localStorage.getItem('UserDetails'));
    this.customerId=this.user.ACECustomerId;
    this.getGroup(this.customerId);
  }
  
  get employerGroup() {
    
    return this.registerForm.get('employerGroup');
  }

  get candidateGroup() {
    return this.registerForm.get('candidateGroup');
  }

 
  onchangeGender($event) {
    this.user.Gender = $event.target.value;
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
      this.user.DateOfBirth =new Date("1990-03-29T13:34:00.000")
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
    this.isLoad=true;
    this.user.ClientOrgGroupId=this.registerForm.controls.candidateGroup.get('Groupselect').value;
    this.getDivisions(this.user.ClientOrgGroupId);
    this.registerForm.controls.candidateGroup.get('Divisionselect').patchValue('');
    this.registerForm.controls.candidateGroup.get('Departmentselect').patchValue('');
    this.divisions=[];
    this.departments=[];
   
  }

  onDivisionChange() {
    this.isLoad=true;
    this.user.ClientOrgDivisionId=this.registerForm.controls.candidateGroup.get('Divisionselect').value;
    this.getDepartments(this.user.ClientOrgDivisionId);
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
  registration()
  {
    this.isLoad=true;
         this.user.MobileNo=this.registerForm.controls.employerGroup.get('MobileNo').value;
         this.user.PostCode=this.registerForm.controls.employerGroup.get('Postcode').value;
         this.user.Gender=this.registerForm.controls.employerGroup.get('Gender').value;
         this.user.DateOfBirth=(this.registerForm.controls.employerGroup.get('DateOfBirth').value).toDateString();
         this.user.ClientOrgGroupId=this.registerForm.controls.candidateGroup.get('Groupselect').value;
         this.user.ClientOrgDivisionId=this.registerForm.controls.candidateGroup.get('Divisionselect').value;
         this.user.ClientOrgDepartmentId=this.registerForm.controls.candidateGroup.get('Departmentselect').value;
      this._portalService.UpdateUserInfo(this.user).subscribe((response: any) => {
        if (response.IsSuccess) {
          this.show1 = false;
          this.show2 = false;
          this.user = response.Result;
          localStorage.clear();
          localStorage.setItem('UserDetails', JSON.stringify(this.user));
          this.router.navigate(['/dashboard/home']);
        }
        else {
          
          this.toasterService.pop('error', '', response.Message);
          return;
        }
        this.isLoad=false;
      }, (err: HttpErrorResponse) => {
       console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
       this.isLoad=false;
      });
  }
}

