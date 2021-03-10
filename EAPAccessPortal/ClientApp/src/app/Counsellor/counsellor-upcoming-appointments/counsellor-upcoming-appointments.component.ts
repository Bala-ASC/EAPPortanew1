import { Component, OnInit } from '@angular/core';
import { UpcomingAppointmentsServiceService } from '../../upcoming-appointments-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitMasterService } from 'src/app/init-master.service';
import { CommonServiceService } from 'src/app/common-service.service';
@Component({
  selector: 'app-counsellor-upcoming-appointments',
  templateUrl: './counsellor-upcoming-appointments.component.html',
  styleUrls: ['./counsellor-upcoming-appointments.component.css']
})
export class CounsellorUpcomingAppointmentsComponent implements OnInit {
  currentUser: any;
  upcomings: any = [];
  selectedAppoinmentId:any;
  UpcomingapptSessions:any;
  sucussmsg:boolean =true;
  private commonServiceService:CommonServiceService;
  constructor(private upcomingappointmentsService: UpcomingAppointmentsServiceService,
     private router: Router,private initMasterService: InitMasterService,_commonServiceService:CommonServiceService) {
      this.commonServiceService=_commonServiceService;
      this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
      if(this.currentUser.RoleId!=5)
    {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
      }

  ngOnInit() {
    this.changeName();
    this.initMasterService.getServiceBaseUrl('../../assets/js/bootstrap.min.js');
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.upcomingAppointments();
  }
  upcomingAppointments() {
    this.upcomingappointmentsService.UpcomingAppointments(this.currentUser.UserId)
      .subscribe((response: any) => {
        if (response) {
          this.upcomings = response.Result;
        }
        else {

        }

      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  RedirectVideoChat(ACEAppointmentId) {
    if (this.currentUser.RoleId == 5) {
      this.router.navigate([`/dashboard-counsellor/videochatroom/${ACEAppointmentId}`]);
    }
    else {

      this.router.navigate([`/dashboard/videochatroom/${ACEAppointmentId}`]);
    }
  }
  onChangeAppointment(ACEAppointmentId){
    
    this.selectedAppoinmentId=ACEAppointmentId;
    
      }
      ChangeAppointment() {
       
        this.upcomingappointmentsService.ChangeAppointment(this.selectedAppoinmentId)
          .subscribe((response: any) => {
            if (response) {
              this.UpcomingapptSessions = response.Result;
              window.scrollTo(0, 0);
              this.sucussmsg= false;
              this.upcomingAppointments();
          setTimeout(() => { this.sucussmsg= true; }, 3000);
            }
            else {
      
            }
      
          }, (err: HttpErrorResponse) => {
            console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
          });
      }
      changeName() {
        this.commonServiceService.change(5);
      }
}
