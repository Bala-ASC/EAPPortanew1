import { Component, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BookingService } from '../booking.service';
import { GeneratedFile } from '@angular/compiler';
import { AppointmentConsents } from './appointment-consents';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { saveAs } from 'file-saver';
import { Htmlconverter } from './htmlconverter';
import { CommonServiceService } from '../common-service.service';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
import { DasboardHomeService } from '../dasboard-home.service';

@Component({
  selector: 'app-make-a-booking',
  templateUrl: './make-a-booking.component.html',
  styleUrls: ['./make-a-booking.component.css']
})
//Used my own logic here, not taken from google or any super seniors..!

//very needfull code this.. plz copy and paste in urs project..
export class MakeABookingComponent implements OnInit {
  //isLoad = true;

  public today = new Date();
  //   fstname = false;
  //   lstname=false;
  //   email=false;
  // phone=false;
  // dob=false;
  IsConsentFormFilled:boolean=false;
  ClientDashboardSessions: any;
  htmlconvert = new Htmlconverter();
  public config: ToasterConfig =
    new ToasterConfig({
      timeout: 3000
    });
    todaydate:any;
  candidateSubmitted: boolean = false;
  AppointmentId: number = 0;
  appointmentConsents = new AppointmentConsents();
  employerSubmitted: boolean = false;
  NewtimeslotBooking:boolean=false;
  ResevationtimeoutFlag:boolean=false;
  registerForm: FormGroup;
  btnnextbutton = true;
  bsValue: Date = new Date();
  private render: Renderer;
  profgender:any;
  profId: any;
  lastDateEvent: any;
  lastTimeEvent: any;
  toWhom = 1;
  fmFirstName: any;
  showquataEmptymsg:boolean=false;
  fmLastName: any;
  fmEmailAddress: any;
  fmPhone: any;
  fmDOB: any;
  isLoad = false;
  counsellingType = 1
  selectedCounsellingType: any;
  acitveClass: "active";
  currentFormIndex = 1;
  gender = 0;
  age = 0;
  isBelow35 = false;
  isAbove35 = false;
  isAbove50 = false;
  show1 = false;
  show2 = false;
  show3 = false;
  show4 = false;
  show5 = false;
  show6 = false;
  show7 = false;
  show8 = false;
  show9 = false;
  show10 = false;
  // showagelessthan18=false;
  //for booking
  minAge: any= "";
  maxAge : any = "";
  selectedGender = "";
  activityTypeIds: any = [];
  earliestDateTime: any;
  latestDateTime: any;
  credential: any;
  bookingSlots: any = [];
  professionals: any = [];
  listofcredencial: any[] = [];
  professionalDates: any = [];
  professionalTimes: any = [];
  professional: any = [];
  professionalDetails: any = [];
  credentiallist: any = [];
  // clientId: any = "933edcb6-fd02-465f-a1bc-d3351ac87bf4";
  clientId:any;
  NumberofSlots:any;
  selectedDate: any;
  selectedTime: any;
  selectedDateTimeStart: any;
  selecteddateTimeEnd: any;
  selectedProfessionalId: any;
  selectedResourceOfficeId: any;
  selectedBookingDiaryId: any;
  currentUser: any;
  reservationId: any;
  isConfirmed = false;
  family_form: FormGroup;
  isLessThan18yr: boolean = false;
  firsttimefemalecounsoller: boolean = false;
  familyflowdesignshow: boolean = false;
  ShowfamilyMembersUnder18Allowed:boolean=false;
  countershow:any;
  private commonServiceService:CommonServiceService;
  private toasterService: ToasterService;
  Resrvationtimeout: any;
  constructor( private dasboardHomeService: DasboardHomeService,private datePipe: DatePipe,toasterService: ToasterService, private _bookingService: BookingService, private _render: Renderer, private formBuilder: FormBuilder, private router: Router,_commonServiceService:CommonServiceService) {
    this.commonServiceService=_commonServiceService;
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    if(this.currentUser.RoleId!=(1 || 2))
    {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
    this.clientId=this.currentUser.ACEClientId;

    this.toasterService = toasterService;
    this.family_form = this.formBuilder.group({
      //'FirstName': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'FirstName': [null, Validators.required],
      'LastName': [null, Validators.required],
      //'EmailAddress': [null, [Validators.required,Validators.email]],
      'EmailAddress': ['', [ Validators.required,Validators.pattern(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/)]],
      'Phone': ['',  [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/\d/)]],
      'dateofbirth': [null, Validators.required]
    });


  }

  ngOnInit() {
   // this.pdfbytesconvert();

   this.changeCurrent();
    this.registerForm = this.formBuilder.group({
      employerGroup: this.formBuilder.group({
        FullName: ['', Validators.required],
        Address: ['', Validators.required],
        Phone: ['',  [Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
        Signature: ['', Validators.required],
        EmergencyContactPerson: ['', Validators.required],
        CreatedDate: ['', Validators.required],
      }),


    });
    this.registerForm.controls.employerGroup.get('FullName').patchValue(this.currentUser.FirstName+' '+this.currentUser.LastName);
    this.todaydate=this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.registerForm.controls.employerGroup.patchValue({CreatedDate:this.todaydate});
    this.getcredentials();
this.GetIsConsentFormFilled();

    if (this.isBelow35) {
      this.minAge = 0;
      this.maxAge = 34;
    }
    if (this.isAbove35) {
      this.minAge = 35;
      this.maxAge = 50;
    }
    if (this.isAbove50) {
      this.minAge = 50;
      this.maxAge = 100;
    }
    if (this.gender == 1)
      this.selectedGender = "Male";
    else if (this.gender == 2)
      this.selectedGender = "Female";
    else if (this.gender == 3)
      this.selectedGender = "No preference";
    let obj = {
      earliestDateTime: "2020-04-29 00:00:00.000",
      latestDateTime: "2020-05-01 00:00:00.000",
      activityTypeIds: "",
      gender: "",
      minAge: "",
      maxAge: "",
      credential: ""
    }
    if(this.currentUser.FamilyMembersAllowed)
    {
  this.show1=true;
    }
    else{
      this.show3=true;
      this.currentFormIndex = 3;
      this.clientId=this.currentUser.ACEClientId;
    }
  }
  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };
  showFamilyForm() {
    this.show2 = true;
    this.show1 = false;
    this.toWhom = 2;
    this.currentFormIndex = 2;
  }
  public checkFamilyForm() {
    this.markFormTouched(this.family_form);
    if (this.family_form.valid) {
      var timeDiff = Math.abs(Date.now() - this.family_form.controls["dateofbirth"].value);
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      var formValues = this.family_form.getRawValue;
      this.fmFirstName = this.family_form.controls["FirstName"].value;
      this.fmLastName = this.family_form.controls["LastName"].value;
      this.fmEmailAddress = this.family_form.controls["EmailAddress"].value;
      this.fmPhone = this.family_form.controls["Phone"].value;
      this.fmDOB = (this.family_form.controls["dateofbirth"].value).toDateString();
      if (this.age >= 18) {
        this.isLessThan18yr = false;

      }
      else {
        this.isLessThan18yr = true;


      }
      return true;
    }
    else {
      return false;
    }
  }
  onBack(index) {
    if (index == 2 || index == 3 || index == 4) {
      if(index==3 && this.toWhom==2){
        this.show8 = false;
        this.show7 = false;
        this.show6 = false;
        this.show5 = false;
        this.show4 = false;
        this.show3 = false;
        this.show2 = true;
        this.show1 = false;
        this.show9 = false;
        this.show10 = false;
        this.currentFormIndex = 2;
      }
      else if(index==2 && this.toWhom==2){
        if(this.isLessThan18yr){
          this.show1 = false;
          this.show2 = true;
          this.show3 = false;
          this.currentFormIndex = 2;
          this.isLessThan18yr=false;
        }
        else
        {
          this.show8 = false;
          this.show7 = false;
          this.show6 = false;
          this.show5 = false;
          this.show4 = false;
          this.show3 = false;
          this.show2 = false;
          this.show1 = true;
          this.show9 = false;
          this.show10 = false;
          this.currentFormIndex = 1;
          this.isLessThan18yr = false;
        }
      }
      else{
      this.show8 = false;
      this.show7 = false;
      this.show6 = false;
      this.show5 = false;
      this.show4 = false;
      this.show3 = false;
      this.show2 = false;
      this.show1 = true;
      this.show9 = false;
      this.show10 = false;
      this.currentFormIndex = 1;
      this.isLessThan18yr = false;
      }
    }
    if (index == 5) {
      this.show8 = false;
      this.show7 = false;
      this.show6 = false;
      this.show5 = false;
      this.show4 = false;
      this.show2 = false;
      this.show1 = false;
      this.show3 = true;
      this.show9 = false;
      this.show10 = false;
      this.currentFormIndex = 3;
    }
    if (index == 6) {
      this.show8 = false;
      this.show7 = false;
      this.show6 = false;
      this.show7 = false;
      this.show6 = false;
      this.show5 = false;
      this.show3 = false;
      this.show2 = false;
      this.show1 = false;
      this.show4 = true;
      this.show9 = false;
      this.show10 = false;
      this.currentFormIndex = 5;
    }
    if (index == 7) {
      this.show8 = false;
      this.show7 = false;
      this.show6 = false;
      this.show3 = false;
      this.show2 = false;
      this.show1 = false;
      this.show4 = false;
      this.show9 = false;
      this.show10 = false;
      this.show5 = true;
      this.currentFormIndex = 6;

    }
    if (index == 8) {
      this.bookingfilter();
      this.isLoad=true;

      this.show3 = false;
      this.show2 = false;
      this.show1 = false;
      this.show4 = false;
      this.show5 = false;
      this.show7 = false;
      this.show9 = false;
      this.show10 = false;
      this.currentFormIndex = 7;
      this.selectedDate = null;
    }

    if (index == 9) {
      this.NewtimeslotBooking =true;
      // if (window.confirm("Are you sure! you want to make new time slot ?")) {
      //   this.show7 = true;
      //   this.show6 = false;
      //   this.show4 = false;
      //   this.show5 = false;
      //   this.show3 = false;
      //   this.show2 = false;
      //   this.show1 = false;
      //   this.show8 = false;
      //   this.show9 = false;
      //   this.show10 = false;
      //   this.currentFormIndex = 8;
      //   this.getProfDates(this.profId,this.profgender);
      //   this.selectedDate = null;
      //   this.selectedTime = null;
      //   this.professionalTimes = [];
      //   this._render.setElementClass(this.lastDateEvent, "active-Date-btn", true);
      //   this._render.setElementClass(this.lastTimeEvent, "active-Date-btn", true);
      //   this._bookingService.DeleteReservation(this.reservationId).subscribe((response: any) => {
      //     debugger
      //     if (response.IsSuccess) {

      //     }
      //     else {
      //       //alert(response.Message);
      //       this.toasterService.pop('error', '', response.Message);
      //     }
      //   }, (err: HttpErrorResponse) => {
      //     console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      //   });
      // }

    }
  }
  onNext(index) {
    debugger;
    if ((index == 1 || index == 2) && this.toWhom == 1) {
      this.show1 = false;
      this.show2 = false;
      this.show3 = true;
      this.currentFormIndex = 3;
      this.clientId=this.currentUser.ACEClientId;
    }
    if (index == 1 && this.toWhom == 2) {
      this.show1 = false;
      this.show2 = true;
      this.show3 = false;
      this.currentFormIndex = 2;
    }
    if (index == 2) {
      if (this.isLessThan18yr) {
        this.isLoad=true;
        let FmClientless18 = {
          UserId: this.currentUser.UserId,
          Email: this.fmEmailAddress,
          FirstName: this.fmFirstName,
          LastName: this.fmLastName,
          PhoneNumber: this.fmPhone,
          DateOfBirth: this.fmDOB
        }
        if(this.currentUser.FamilyMembersUnder18Allowed)
        {
          this._bookingService.CreateAceFamilyMember(FmClientless18).subscribe((response: any) => {
            debugger;
            if (response.IsSuccess) {
              if(response.Result.id !=null){
                this.show1 = false;
              this.show2 = false;
               this.show3 = true;
                this.currentFormIndex = 3;
               this.clientId =response.Result.id;
               this.isLoad=false;
              }
              else {
                //alert("Looks like this appointment time is not available anymore. Please try another time.");
              }

            }
            else {
            //  response.message;
              // alert(response.message);
              this.toasterService.pop('error', '', response.Message);
            }
            this.isLoad=false;
          }, (err: HttpErrorResponse) => {
            console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
            this.isLoad=false;
          });
        }
        else{
          this.ShowfamilyMembersUnder18Allowed=true;
         this.isLoad=false;
        }

      }
      if (this.checkFamilyForm()) {
        if (this.isLessThan18yr) {
          //do validation for this form and proceed
          //alert('form implementation is in progress.. plz go back and enter correct date.');
        }
        else {
          this.isLoad=true;
          let FmClient = {
            UserId: this.currentUser.UserId,
            Email: this.fmEmailAddress,
            FirstName: this.fmFirstName,
            LastName: this.fmLastName,
            PhoneNumber: this.fmPhone,
            DateOfBirth: this.fmDOB
          }
          this._bookingService.CreateAceFamilyMember(FmClient).subscribe((response: any) => {
            debugger
            if (response.IsSuccess) {
              if(response.Result.id !=null){
                this.show1 = false;
                this.show2 = false;
                this.show3 = true;
                this.currentFormIndex = 3;
               this.clientId =response.Result.id;
               this.isLoad=false;
              }
              else {
                //alert("Looks like this appointment time is not available anymore. Please try another time.");
              }

            }
            else {
            //  response.message;
              // alert(response.message);
              this.toasterService.pop('error', '', response.Message);
            }
            this.isLoad=false;
          }, (err: HttpErrorResponse) => {
            console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
            this.isLoad=false;
          });

        }
      }
    }

    if (index == 3) {
      this.makebooking();
    }

    if (index == 4) {
      this.show1 = false;
      this.show2 = false;
      this.show3 = true;
      this.show9 = false;
      this.currentFormIndex = 3;
    }

    if (index == 5) {
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show9 = false;
      this.show4 = false;
      this.show5 = true;
      this.currentFormIndex = 6;
      this.professional=[];
    }
    if (index == 6) {
      this.bookingfilter();
      this.isLoad=true;
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show9 = false;
      this.show4 = false;
      this.show5 = false;


      this.currentFormIndex = 7;
    }
    if (index == 7) {
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show9 = false;
      this.show4 = false;
      this.show5 = false;
      this.show6 = false;
      this.show7 = true;
      this.currentFormIndex = 8;
    }
    if (index == 8) {
      // this.selectedDateTimeStart = this.selectedDate;
      if (this.selectedDate == null || this.selectedTime == null) {
        //alert('');
        this.toasterService.pop('error', '', 'please select date and time slot to continue.');
        return;
      }
      this.isLoad=true;
      if (this.counsellingType == 1)
        this.selectedCounsellingType = "Face to Face";
      if (this.counsellingType == 2)
        this.selectedCounsellingType = "Telephone";
      if (this.counsellingType == 3)
        this.selectedCounsellingType = "Video";
      if (this.counsellingType == 4)
        this.selectedCounsellingType = "Scheduled Chat";
      let selDate = this.selectedDate;
      let selTime = this.selectedTime;
      this.selectedDateTimeStart = this.professional.filter(function (item) {
        return (item.startDate === selDate && item.startTime === selTime);
      })[0].dateTimeStart;
      this.selecteddateTimeEnd = this.professional.filter(function (item) {
        return (item.startDate === selDate && item.startTime === selTime);
      })[0].dateTimeEnd;
      this.selectedProfessionalId = this.profId;
      this.selectedResourceOfficeId = this.professional[0].resourceOfficeId;
      this.selectedBookingDiaryId = this.professional[0].bookingDiaryId;
      //var s1 = JSON.parse(this.currentUser);
      let reserv = {

        UserId: this.currentUser.UserId,
        ActivityTypeFlag: this.selectedCounsellingType,
        DateTimeStart: this.selectedDateTimeStart,
        DateTimeEnd: this.selecteddateTimeEnd,
        ProfessionalId: this.selectedProfessionalId,
        ResourceOfficeId: this.selectedResourceOfficeId,
        BookingDiaryId: this.selectedBookingDiaryId
      }
      this._bookingService.MakeReservation(reserv, this.clientId).subscribe((response: any) => {
        if (response.IsSuccess) {
          if(response.Result.reservationId !=null){
          this.reservationId = response.Result.reservationId;
          this.show1 = false;
          this.show2 = false;
          this.show3 = false;
          this.show9 = false;
          this.show4 = false;
          this.show5 = false;
          this.show6 = false;
          this.show7 = false;
          this.show8 = true;
          this.currentFormIndex = 9;
          }
          else {
            alert("Looks like this appointment time is not available anymore. Please try another time.");
          }

        }
        else {
        //  response.message;
          // alert(response.message);
          this.toasterService.pop('error', '', 'Reservation is not done please try again');
        }
        this.isLoad=false;
      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        this.isLoad=false;
      });
    }
    //this.currentFormIndex=1;
  }
  onBook(p) {
    this.show1 = false;
    this.show2 = false;
    this.show3 = false;
    this.show4 = false;
    this.show5 = false;
    this.show6 = false;
    this.show7 = true;
    this.show9 = false;
    //this.show8=true;
    this.currentFormIndex = 8;
    this.profId = p.professionalId;
    this.profgender=p.Gender;
    this.professional=[];
    this.professionalDates = [];
    this.professionalTimes = [];
    this.getProfDates(p.professionalId,p.Gender);
    this.getProfdeatils(p.professionalId,p.Gender);
    if(p.Gender=="Female" && this.counsellingType==1) {
      this._bookingService.IsFemaleCounsellerFirstF2FMeeting(this.currentUser.UserId,p.professionalId).subscribe((response: any) => {
        if (response.IsSuccess) {
          this.NumberofSlots =response.Result.Nofoslots;
          if(this.NumberofSlots == 0){
          this.firsttimefemalecounsoller=true;
          }
          // alert('Appointment is submitted.');
        }
        else {
          //this.isConfirmed=false;
          //
        }
      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
    }
    //Array.from(new Set(this.professional.map(p => new Date(p.startDate).toDateString())));

    //  [new Map(this.professional.map((item:any) =>[item['startDate'], item])).values()];
    //Array.from(new Set(this.professionalTimes.map((item: any) => item.dateTimeStart)))
  }

  getProfDates(id,gender) {
    this.professional = this.bookingSlots.filter(function (item) {
      //item.startDate = new Date(item.startDate).toDateString().split('T')[0],
      // item.startTime = new Date(item.dateTimeStart).toLocaleTimeString();
      return item.professionalId === id;
    });
    this.professionalDates = Array.from(new Set(this.professional.map(p => p.startDate)));
  }
   getProfdeatils(id,gender) {
    this.professionalDetails = this.professionals.filter(function (item) {

      //item.startDate = new Date(item.startDate).toDateString().split('T')[0],
      // item.startTime = new Date(item.dateTimeStart).toLocaleTimeString();
      return item.professionalId === id;
    });

  }
  //very needfull code this.. plz copy and paste in urs project..
  onDateSelect(date, index, event) {
    //let element= document.getElementById("datesbtn"+index+"");
    //element.classList.remove();
    //element.classList.add('active-Date-btn');
    // let selDate=new Date(date).toLocaleDateString();
    //alert(date + '' + index);
    if(this.firsttimefemalecounsoller){
    this.professionalTimes = this.professional.filter(function (item) {
        return item.startDate === date  && item.Timetest >= 0 && item.Timetest < 17;
    });
  }
  else{
    this.professionalTimes = this.professional.filter(function (item) {
      return item.startDate === date;
  });
  }


    this.selectedDate = date;

    this._render.setElementClass(event.target, "active-Date-btn", true);
    if (this.lastDateEvent != null) {
      this._render.setElementClass(this.lastDateEvent, "active-Date-btn", false);
    }
    this.lastDateEvent = event.target;

  }
  onTimeSelect(time, index, event) {
    this.selectedTime = time;
    // let selDate=new Date(date).toLocaleDateString();
    // alert(time + '' + index);
    this._render.setElementClass(event.target, "active-Time-btn", true);
    if (this.lastTimeEvent != null) {
      this._render.setElementClass(this.lastTimeEvent, "active-Time-btn", false);
    }
    this.lastTimeEvent = event.target;
  }
  confirmAppointment() {
    this.isLoad = true;
    //var s = JSON.parse(this.currentUser);
    let confirmObj = {
      UserId: this.currentUser.UserId,
      ReservationId: this.reservationId,
      IsForFamilyMember: this.toWhom === 2 ? true : false,
      FMFirstName: this.fmFirstName,
      FMLastName: this.fmLastName,
      FMEmail: this.fmEmailAddress,
      FMBirthDate: this.fmDOB,
      FMPhone: this.fmPhone
    }
    this._bookingService.ConfirmAppointment(confirmObj).subscribe((response: any) => {
      if (response.IsSuccess) {
        if(response.Result.AppointmentId != null)
        {
        this.AppointmentId = response.Result.AppointmentId;
        this.isConfirmed = true;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show9 = false;
        this.show4 = false;
        this.show5 = false;
        this.show6 = false;
        this.show7 = false;
        this.isLoad = false;
        this.btnnextbutton = false;
        this.currentFormIndex=10;
        // this.show8 = false;

        if(confirmObj.IsForFamilyMember || this.IsConsentFormFilled){
          this.familyflowdesignshow=false;
          // this.toasterService.pop('success', '', 'Appointment is Confirmed');
          // this.router.navigate(['/dashboard/upcomingappointments']);
        }
        else{
          this.familyflowdesignshow=true;
          this.startCountdown(5)
        // setTimeout(() => {
        //   this.show8 = false;
        //   this.show10 = true;
        // }, 10000);
        //this.openConsentFormAfter10Sec();
      }
        // alert('Appointment is submitted.');
    }
    else {
      alert("Oops! Your reservation has expired. Please try again.")
    }
      }
      else {
       this.Resrvationtimeout= response.Message;
       this.ResevationtimeoutFlag=true;
        this.isConfirmed = false;
        this.isLoad = false;
        //
      }
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    });
  }
  // openConsentFormAfter10Sec() {
  //   setTimeout(function () {
  //     alert('show cosent Form-');
  //     this.show8 = false;
  //     this.show10 = true;
  //   }, 10000);
  // }

  onSkip(index) {
    if (index == 5) {
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
      this.show5 = true;
      this.currentFormIndex = 6;
      if (this.counsellingType == 1)
      this.selectedCounsellingType = "Face to Face";
    if (this.counsellingType == 2)
      this.selectedCounsellingType = "Telephone";
    if (this.counsellingType == 3)
      this.selectedCounsellingType = "Video";
    if (this.counsellingType == 4)
      this.selectedCounsellingType = "Scheduled Chat";
      this.gender=0;
      this.maxAge="";
      this.minAge="";
      let CounsellingType: any = [];
      CounsellingType.push(this.selectedCounsellingType);
      let obj = {
        earliestDateTime: "2020-04-29 00:00:00.000",
        latestDateTime: "2020-05-01 00:00:00.000",
        activityTypeIds: CounsellingType,
        gender: "",
        minAge:"",
        maxAge: "",
        credential: ""
      }

      this._bookingService.FindBookingSlots(obj, this.clientId,this.currentUser.UserId,this.counsellingType).subscribe((response: any) => {
       this.isLoad=true;
        if (response.IsSuccess) {
          this.bookingSlots = response.Result.BookingSlots;
          this.professionals = response.Result.Professionals;
          // for(let i=0;i<this.professionals.length;i++){
          //   this.professionals[i].Specialities= this.professionals[i].Specialities.replace('&amp;','&');
          // }
         // this.show6 = true;

        }
        else {
          //alert(response.Message);
          this.toasterService.pop('error', '', response.Message);
        }
        this.isLoad=false;
      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        this.isLoad=false;
      });
    }
    if (index == 6) {
      this.isLoad=true;
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
      this.show5 = false;
      this.currentFormIndex = 7;
      if (this.isBelow35) {
        this.minAge = 0;
        this.maxAge = 34;
      }
      if (this.isAbove35) {
        this.minAge = 35;
        this.maxAge = 50;
      }
      if (this.isAbove50) {
        this.minAge = 50;
        this.maxAge = 100;
      }
      if(this.isBelow35 && this.isAbove35)
      {
        this.minAge = 0;
        this.maxAge = 50;
      }
      if(this.isBelow35 && this.isAbove35 && this.isAbove50)
      {
        this.minAge = 0;
        this.maxAge = 100;
      }
      if (this.gender == 1)
        this.selectedGender = "Male";
      else if (this.gender == 2)
        this.selectedGender = "Female";
      else if (this.gender == 3)
        this.selectedGender = "";
        else if (this.gender == 0)
        this.selectedGender = "";

        if (this.counsellingType == 1)
        this.selectedCounsellingType = "Face to Face";
      if (this.counsellingType == 2)
        this.selectedCounsellingType = "Telephone";
      if (this.counsellingType == 3)
        this.selectedCounsellingType = "Video";
      if (this.counsellingType == 4)
        this.selectedCounsellingType = "Scheduled Chat";
     // this.gender=this.selectedGender;
    //  this.maxAge=this.maxAge;
     // this.minAge=this.minAge;
     let CounsellingType1: any = [];
     CounsellingType1.push(this.selectedCounsellingType);
      let obj = {
        earliestDateTime: "2020-04-29 00:00:00.000",
        latestDateTime: "2020-05-01 00:00:00.000",
        activityTypeIds: CounsellingType1,
        gender: this.selectedGender,
        minAge:this.minAge,
        maxAge: this.maxAge,
        credential: ""
      }

      this._bookingService.FindBookingSlots(obj, this.clientId,this.currentUser.UserId,this.counsellingType).subscribe((response: any) => {

        if (response.IsSuccess) {
          this.bookingSlots = response.Result.BookingSlots;
          this.professionals = response.Result.Professionals;
          // for(let i=0;i<this.professionals.length;i++){
          //   this.professionals[i].Specialities=this.professionals[i].Specialities.replace('&amp;','&');
          // }
          this.show6 = true;

        }
        else {
          //alert(response.Message);
          this.toasterService.pop('error', '', response.Message);
        }
        this.isLoad=false;
      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        this.isLoad=false;
      });
    }
  }
  getcredentials() {
    this._bookingService.getcredential().subscribe((response: any) => {
      if (response.IsSuccess) {
        this.credentiallist = response.Result;
        // alert('Appointment is submitted.');
      }
      else {
        //this.isConfirmed=false;
        //
      }
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    });
  }
  get employerGroup() {

    return this.registerForm.get('employerGroup');
  }
  get candidateGroup() {
    return this.registerForm.get('candidateGroup');
  }
  get fe() { return (<FormGroup>this.registerForm.get('employerGroup')).controls; }

  get fc() { return (<FormGroup>this.registerForm.get('candidateGroup')).controls; }
  login() {
    this.employerSubmitted = true;
    if (this.registerForm.controls.employerGroup.invalid) {
      return;
    }
    else {
      this.isLoad=true;
      this.appointmentConsents.AppointmenId = this.AppointmentId;
      this.appointmentConsents.UserId = this.currentUser.UserId;
      this.appointmentConsents.FullName = this.registerForm.controls.employerGroup.get('FullName').value;
      this.appointmentConsents.Address = this.registerForm.controls.employerGroup.get('Address').value;
      this.appointmentConsents.Phone = this.registerForm.controls.employerGroup.get('Phone').value;
      this.appointmentConsents.Signature = this.registerForm.controls.employerGroup.get('Signature').value;
      this.appointmentConsents.UserEnteredDate = this.registerForm.controls.employerGroup.get('CreatedDate').value;
      this.appointmentConsents.EmergencyContactPerson = this.registerForm.controls.employerGroup.get('EmergencyContactPerson').value;
      this.pdfbytesconvert();
      this.addconsentForm();

    }
  }
  pdfbytesconvert()
  {

var y=`<div style="float: left;width: 92%; padding:0% 4% 3% 4%; color: #4D4D4F; font-size:16px; line-height:26px; font-family:Arial, sans-serif, Gotham, 'Helvetica Neue', Helvetica">
<div style="background: rgba(220, 221, 222, 0.30);border-radius: 10px; padding: 30px;float: left;width:calc(100% - 60px);">
    <p><strong>Welcome</strong> and thank you for contacting AccessEAP, the provider of your organisation's Employee Assistance Program (EAP).  It is our aim to provide you with a professional assessment, appropriate counselling, and where necessary, a referral to meet your needs.  Your counsellor will provide assistance and support for a personal or a work-related issue.  This could involve from one to six hours counselling, depending on the agreement we have with your employer.</p>
    <p>As part of providing a counselling service to you the counsellor will need to collect and record personal information from you that is relevant to your current situation.  This information will be a necessary part of the assessment and treatment that is conducted by your counsellor.  You may view and have a copy of the material recorded in your file upon request, subject to the exceptions in Australian Privacy Principle 12.</p>
    <p>Prior to your first counselling session we ask you to complete an Intake Questionnaire and at the end of your counselling we will invite you, via email, to complete an online evaluation of the service you have received.  You do not have to complete these forms, but we would like you to, because it helps us provide a good quality service.</p>

    <h4 style="font-size:18px;">CONFIDENTIALITY GUARANTEED</h4>

    <p>AccessEAP guarantees confidentiality of all sessions, unless written permission is given by you to (a) discuss information with another professional, family member, work colleague or employer or (b) provide a written report to another professional or agency. However, confidentiality may be overridden in circumstances where there is a current or prospective serious risk of injury, either physical or emotional, to any person including yourself, or if a court issues a subpoena. All information you provide on the Intake Questionnaire and the Evaluation Form are also confidential.  Only statistical data is reported back to Companies and Organisations, and never in a way that identifies individuals.</p>

    <h4 style="font-size:18px;">KEEPING APPOINTMENTS</h4>
    <p>It is important to give at least 24 hours notice if you are unable to keep an appointment so that another client may be able to use that time period.  If you do not give 24 hours notice or do not attend for a counseling session, this session is still included in the number allocated by your employer.  You will therefore forfeit this session.</p>

    <form>
        <p><span style="width: 30px; display: inline-block;">I</span> <input type="text" value='${this.appointmentConsents.FullName.toUpperCase()}' style="width:100%; max-width: 340px;background: rgba(220, 221, 222, 0.40);border:0px;border-radius:10px;display: inline-block;height:40px;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;color: #495057;"> (Insert Name)</p>

        <p><span style="width: 30px; display: inline-block;">of,</span> <input type="text" value='${this.appointmentConsents.Address.toUpperCase()}' style="width:100%; max-width:495px;background: rgba(220, 221, 222, 0.40);border:0px;border-radius:10px;display: inline-block;height:40px;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;color: #495057;"> (Insert Address)</p>

        <p>have read and understood the above information.  I agree to these conditions for the counselling service provided by AccessEAP.</p>

        <p>An emergency contact person for me is:  <input type="text" value='${this.appointmentConsents.EmergencyContactPerson}' style="width:100%; max-width:340px; background: rgba(220, 221, 222, 0.40);border:0px;border-radius:10px;display: inline-block;height:40px;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;color: #495057;"></p>

        <p>Phone: <input type="text" value='${this.appointmentConsents.Phone}' style="width:calc(100% - 90px); background: rgba(220, 221, 222, 0.40);border:0px;border-radius:10px;display: inline-block;height:40px;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;color: #495057;"></p>

        <p>Signature: <input type="text" value='${this.appointmentConsents.Signature}' style="width:calc(100% - 120px); background: rgba(220, 221, 222, 0.40);border:0px;border-radius:10px;display: inline-block;height:40px;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;color: #495057;"></p>

        <p>Date: <input type="text" value='${this.appointmentConsents.UserEnteredDate}' style="width:calc(100% - 80px); background: rgba(220, 221, 222, 0.40);border:0px;border-radius:10px;display: inline-block;height:40px;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;color: #495057;"></p>

        <p>Please note: If, after reading this page you are at all unsure of what is written, please discuss it with the counsellor.</p>
    </form>
</div>
</div>`
this.htmlconvert.html1 = y;

  }
  genaratepdf()
  {
    this._bookingService.Getpdf(this.htmlconvert)
    .subscribe(blob => {
     saveAs(blob, 'ConsentForm.pdf', {

      });
    });
  }
  startCountdown(seconds){
    this.isLoad=true;
    let counter = seconds;

    let interval = setInterval(() => {
      console.log(counter);
      this.countershow=counter;
      counter--;
      if(counter < 0 ){
        clearInterval(interval);
        setTimeout(() => {
          this.isLoad=false;
            this.show8 = false;
            this.show10 = true;
          }, 1000);
      };
      // if(counter==0)
      // {
      //   this.show8 = false;
      //   this.show10 = true;
      // }
    }, 1000);
  };
  changeCurrent(){
    this.commonServiceService.change(2);
  }

  bookingfilter(){
    if (this.isBelow35) {
      this.minAge = 0;
      this.maxAge = 34;
    }
    if (this.isAbove35) {
      this.minAge = 35;
      this.maxAge = 50;
    }
    if (this.isAbove50) {
      this.minAge = 50;
      this.maxAge = 100;
    }
    if(this.isBelow35 && this.isAbove35)
    {
      this.minAge = 0;
      this.maxAge = 50;
    }
    if(this.isBelow35 && this.isAbove35 && this.isAbove50)
    {
      this.minAge = 0;
      this.maxAge = 100;
    }
    if (this.gender == 1)
      this.selectedGender = "Male";
    else if (this.gender == 2)
      this.selectedGender = "Female";
    else if (this.gender == 3)
      this.selectedGender = "";
      else if (this.gender == 0)
      this.selectedGender = "";

      if (this.counsellingType == 1)
      this.selectedCounsellingType = "Face to Face";
    if (this.counsellingType == 2)
      this.selectedCounsellingType = "Telephone";
    if (this.counsellingType == 3)
      this.selectedCounsellingType = "Video";
    if (this.counsellingType == 4)
      this.selectedCounsellingType = "Scheduled Chat";

      let CounsellingType3: any = [];
      CounsellingType3.push(this.selectedCounsellingType);
    let obj = {
      earliestDateTime: "2020-04-29 00:00:00.000",
      latestDateTime: "2020-05-01 00:00:00.000",
      activityTypeIds: CounsellingType3,
      gender: this.selectedGender,
      minAge: this.minAge,
      maxAge: this.maxAge ,
      credential: "",
      specialityIDs:this.listofcredencial
    }
    this._bookingService.FindBookingSlots(obj, this.clientId,this.currentUser.UserId,this.counsellingType).subscribe((response: any) => {
      if (response.IsSuccess) {
        this.bookingSlots = response.Result.BookingSlots;
        this.professionals = response.Result.Professionals;
        // for(let i=0;i<this.professionals.length;i++){
        //   this.professionals[i].Specialities=this.professionals[i].Specialities.replace('&amp;','&');
        // }
        this.show6 = true;
      }
      else {
        //alert(response.Message);
        this.toasterService.pop('error', '', response.Message);
      }
      this.isLoad=false;
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        this.isLoad=false;
    });
  }
  addconsentForm()
  {
    this.appointmentConsents.ConsentPdfFile=this.htmlconvert.html1;
    this._bookingService.addConsentForm(this.appointmentConsents).subscribe((response: any) => {
      if (response.IsSuccess) {
        this.genaratepdf();
        this.toasterService.pop('success', '', 'Appointment is Confirmed');
        this.router.navigate(['/dashboard/upcomingappointments']);
        // alert('Appointment is submitted.');
      }
      else {
        //this.isConfirmed=false;
        //
        this.toasterService.pop('error', '', 'Something is went wrong please try later');
      }
      this.isLoad=false;
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      this.isLoad=false;
    });
  }
  GetClientDashboardSessions() {
    this._bookingService.GetClientDashboard(this.currentUser.UserId, this.currentUser.ACEClientId)
      .subscribe((response: any) => {
        if (response) {
          this.ClientDashboardSessions = response.Result;
        }
        else {

        }

      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  public matcher(event) {
    const allowedRegex = /[0-9]/g;

    if (!event.key.match(allowedRegex)) {
        event.preventDefault();
    }
  }
  onChange(CredentialId:string, isChecked: boolean) {
    //const emailFormArray = <FormArray>this.myForm.controls.useremail;
    if(isChecked) {
      this.listofcredencial.push(CredentialId);
    }
    else{
      let index =  this.listofcredencial.findIndex(x => x.value == CredentialId)
      this.listofcredencial.splice(index);
    }
  }
  ClickInstantchattop(){
    window.location.href='/dashboard/chatroom';
   }
   NewtimeslotBookingOk(){
     this.NewtimeslotBooking=false;
     this.show7 = true;
      this.show6 = false;
      this.show4 = false;
      this.show5 = false;
      this.show3 = false;
      this.show2 = false;
      this.show1 = false;
      this.show8 = false;
      this.show9 = false;
      this.show10 = false;
      this.currentFormIndex = 8;
      this.getProfDates(this.profId,this.profgender);
      this.selectedDate = null;
      this.selectedTime = null;
      this.professionalTimes = [];
      this._render.setElementClass(this.lastDateEvent, "active-Date-btn", true);
      this._render.setElementClass(this.lastTimeEvent, "active-Date-btn", true);
      this._bookingService.DeleteReservation(this.reservationId).subscribe((response: any) => {
        if (response.IsSuccess) {

        }
        else {
          //alert(response.Message);
          this.toasterService.pop('error', '', response.Message);
        }
      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
   }
   NewtimeslotBookingCancle(){
    this.NewtimeslotBooking=false;
   }
   Resrvationtimeoutok(){
    this.ResevationtimeoutFlag=false;
  }
   GetIsConsentFormFilled() {
    this._bookingService.GetIsConsentFormFilled(this.currentUser.UserId)
      .subscribe((response: any) => {
        if (response.IsSuccess) {
          this.IsConsentFormFilled=response.Result;
        }


      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  makebooking() {
    this.isLoad=true;
      this.dasboardHomeService.GetClientDashboard(this.currentUser.UserId, this.clientId)
        .subscribe((response: any) => {
          if (response) {
            this.ClientDashboardSessions = response.Result;
            if((this.ClientDashboardSessions.AllowedAppts-this.ClientDashboardSessions.UsedAppts)==0)
            {
               this.isLoad=false;
              this.showquataEmptymsg=true;
              return;

            }
            else {
              this.show1 = false;
              this.show2 = false;
              this.show3 = false;
              this.show9 = false;
              this.show4 = true;
              this.currentFormIndex = 5;
              this.isLoad=false;
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
   closeModel18Allowed() {
    this.ShowfamilyMembersUnder18Allowed= false;
 }

}
