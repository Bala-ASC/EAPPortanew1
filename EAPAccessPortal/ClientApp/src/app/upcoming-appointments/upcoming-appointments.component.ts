import { Component, OnInit } from '@angular/core';
import { UpcomingAppointmentsServiceService } from '../upcoming-appointments-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InitMasterService } from '../init-master.service';
import { CommonServiceService } from '../common-service.service';
import { DasboardHomeService } from '../dasboard-home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-appointments',
  templateUrl: './upcoming-appointments.component.html',
  styleUrls: ['./upcoming-appointments.component.css']
})
export class UpcomingAppointmentsComponent implements OnInit {

  showquataEmptymsg = false;
  isLoad = false;
  currentUser: any;
  upcomings: any;
  selectedAppoinmentId: any;
  UpcomingapptSessions: any;
  ClientDashboardSessions: any;
  sucussmsg: boolean = true;
  private commonServiceService: CommonServiceService;
  selectedMobileNumber: any;
  selecteAppointmentdDate: any;
  clientName: any;
  AppDate: any;
  AppTime: any;
  constructor(private router: Router, private dasboardHomeService: DasboardHomeService, private upcomingappointmentsService: UpcomingAppointmentsServiceService, private initMasterService: InitMasterService, _commonServiceService: CommonServiceService) {
    this.commonServiceService = _commonServiceService;
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    if(this.currentUser.RoleId!=(1 || 2))
    {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.changeName();
    this.initMasterService.getServiceBaseUrl('../assets/js/bootstrap.min.js');
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.upcomingAppointments();
  }
  upcomingAppointments() {
    this.upcomingappointmentsService.UpcomingAppointments(this.currentUser.UserId)
      .subscribe((response: any) => {
        if (response) {
          console.log(response.Result);
          this.upcomings = response.Result;

        }
        else {

        }

      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  onChangeAppointment(appointmentDetails) {
    console.log(appointmentDetails);

    this.selectedAppoinmentId = appointmentDetails.ACEAppointmentId;
    this.selecteAppointmentdDate =appointmentDetails.StartDate;
    this.selectedMobileNumber =appointmentDetails.CounsellerMobileNo;
    this.clientName =appointmentDetails.Username;
    this.AppDate=appointmentDetails.endDate;
    this.AppTime=appointmentDetails.endTime;
  }
  ChangeAppointment() {

    this.upcomingappointmentsService.ChangeAppointment(this.selectedAppoinmentId)
      .subscribe((response: any) => {
        console.log(response);
        window.scrollTo(0, 0);
        this.sucussmsg= false;
        this.upcomingAppointments()
        setTimeout(() => { this.sucussmsg= true; }, 3000);

      //  this.CancelAppointment(this.selecteAppointmentdDate,this.selectedMobileNumber);

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
      this.upcomingappointmentsService.CancelAppointment(data)
        .subscribe((response: any) => {
          console.log(response);

        });
    }

  }
  changeName() {
    this.commonServiceService.change(5);
  }
  makebooking() {
    this.isLoad = true;
    this.dasboardHomeService.GetClientDashboard(this.currentUser.UserId, this.currentUser.ACEClientId)
      .subscribe((response: any) => {
        if (response) {
          this.ClientDashboardSessions = response.Result;
          if ((this.ClientDashboardSessions.AllowedAppts - this.ClientDashboardSessions.UsedAppts) == 0) {
            this.isLoad = false;
            this.showquataEmptymsg = true;
            return;
          }
          else {

            this.isLoad = false;
            this.router.navigate(["/dashboard/booking"]);

          }
        }
        else {
          this.isLoad = false;
          this.showquataEmptymsg = true;
          return;
        }

      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        this.isLoad = false;
      });

  }
  closeModel() {
    this.showquataEmptymsg = false;
  }
  ClickInstantchattop() {
    window.location.href = '/dashboard/chatroom';
  }
}
