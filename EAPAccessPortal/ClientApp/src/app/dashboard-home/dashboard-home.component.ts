import { Component, OnInit ,Input, HostListener} from '@angular/core';
import { DasboardHomeService } from '../dasboard-home.service';
import { HttpErrorResponse } from '@angular/common/http';
import{CommonServiceService} from '../common-service.service';
import { NavigationStart,Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../Counsellor/counsellor-my-profile/user';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  showquataEmptymsg=false;
  currentUser: any;
  isLoad=false;
  CurrentmonthAppts: any = [];
  ClientDashboardSessions: any;
  clientId: any ;
  ACEAppointmentId: any;
  selectedAppoinmentId:any;
  sucussmsg:boolean =true;
  onMain:number;
  subscription: Subscription;
  browserRefresh:boolean =true;
  counsollerMobilenumber:any;
  private commonServiceService:CommonServiceService;
  selecteAppointmentdDate: any;
  selectedMobileNumber: any;
  user = new User();
  clientName: any;
  AppDate: any;
  AppTime: any;
  constructor(private dasboardHomeService: DasboardHomeService,_commonServiceService:CommonServiceService, private router: Router) {
    this.commonServiceService=_commonServiceService;
    this.user = JSON.parse(localStorage.getItem('UserDetails'));
    if(this.user.RoleId!=(1 || 2))
    {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
   }
  //  @HostListener('window:beforeunload', ['$event'])
  //  beforeUnloadHander(event) {
  //   event.returnValue = "Are you sure?"
  //    debugger;
  //      return false;
  //  }
  ngOnInit() {

    this.changeName();
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.CurrentMonthAppointments();
    this.GetClientDashboardSessions();
    this.clientId=this.currentUser.ACEClientId;
  }

  CurrentMonthAppointments() {
    this.dasboardHomeService.CurrentMonthAppointments(this.currentUser.UserId)
      .subscribe((response: any) => {
        if (response) {
          console.log(response.Result);
          this.CurrentmonthAppts = response.Result;
        }
        else {

        }

      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  GetClientDashboardSessions() {
    this.dasboardHomeService.GetClientDashboard(this.currentUser.UserId, this.currentUser.ACEClientId)
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
  onChangeAppointment(appointmentDetails){

    this.selectedAppoinmentId=appointmentDetails.ACEAppointmentId;
    this.selecteAppointmentdDate =appointmentDetails.StartDate;
    this.selectedMobileNumber =appointmentDetails.CounsellerMobileNo;
    this.clientName =appointmentDetails.Username;
    this.AppDate=appointmentDetails.endDate;
    this.AppTime=appointmentDetails.endTime;

  }
  ChangeAppointment() {
    this.dasboardHomeService.ChangeAppointment(this.selectedAppoinmentId)
      .subscribe((response: any) => {
        if (response) {
          this.GetClientDashboardSessions();
         // this.ClientDashboardSessions = response.Result;
         // this.CancelAppointment(this.selecteAppointmentdDate,this.selectedMobileNumber);
          window.scrollTo(0, 0);
          this.sucussmsg= false;
          this.CurrentMonthAppointments();
          setTimeout(() => { this.sucussmsg= true; }, 3000);

        }
        else {

        }
      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  CancelAppointment(appointmentDate,CounsellerMobileNo) {
    let date = appointmentDate.split('T')[0];
    let year = date.split('-')[0];
    let month = date.split('-')[1];
    let day = date.split('-')[2];

    let time = appointmentDate.split('T')[1];
    let hours = time.split(':')[0];
    let min = time.split(':')[1];

    let currDate = new Date().getDate();
    let currMonth = new Date().getMonth();
    let currYear = new Date().getFullYear();

    let currHours = new Date().getHours();
    let currMin = new Date().getMinutes();

    const oneDay = 60 * 60 * 1000;
    const firstDate: any = new Date(year, (month - 1), day, hours, min);
    const secondDate: any = new Date(currYear, currMonth, currDate, currHours, currMin);

    const diffDays: any = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    if (diffDays <= 48) {
      let data = {
        "recipient": CounsellerMobileNo,
        "body": "Your appointment on "+this.AppDate+" at "+ this.AppTime+" with "+this.clientName+" has been cancelled."
      }
      this.dasboardHomeService.CancelAppointment(data)
        .subscribe((response: any) => {
          console.log(response);

        });
    }

  }
  changeName() {
    this.commonServiceService.change(1);
  }
  makebooking()
  {
    this.isLoad=true;
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
  closeModel() {
    this.showquataEmptymsg= false;
 }
 ClickInstantchattop(){
  window.location.href='/dashboard/chatroom';
 }

}


