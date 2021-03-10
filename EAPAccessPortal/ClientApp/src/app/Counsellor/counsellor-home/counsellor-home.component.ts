import { Component, OnInit } from '@angular/core';
import{ DasboardHomeService  } from '../../dasboard-home.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/common-service.service';


@Component({
  selector: 'app-counsellor-home',
  templateUrl: './counsellor-home.component.html',
  styleUrls: ['./counsellor-home.component.css']
})
export class CounsellorHomeComponent implements OnInit {
  currentUser: any;
  CurrentmonthAppts: any = [];
  ClientDashboardSessions: any ;
  clientId: any = "933edcb6-fd02-465f-a1bc-d3351ac87bf4";
  ACEAppointmentId: any;
  selectedAppoinmentId:any;
  sucussmsg:boolean =true;
  private commonServiceService:CommonServiceService;
  constructor(private dasboardHomeService: DasboardHomeService,private router: Router,_commonServiceService:CommonServiceService) { 
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
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.CurrentMonthAppointments();
    this. GetClientDashboardSessions();
  }
  
  CurrentMonthAppointments()
  {
      this.dasboardHomeService.CurrentMonthAppointments(this.currentUser.UserId)
      .subscribe((response : any) => {
            if(response)
            {
              this.CurrentmonthAppts = response.Result;
            }
            else{

            }

      },(err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  GetClientDashboardSessions()
  {
      this.dasboardHomeService.GetClientDashboard(this.currentUser.UserId,this.clientId)
      .subscribe((response : any) => {
            if(response)
            {
              this.ClientDashboardSessions = response.Result;
            }
            else{

            }

      },(err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  onChangeAppointment(ACEAppointmentId){
    
    this.selectedAppoinmentId=ACEAppointmentId;
    
      }
      ChangeAppointment() {
       
        this.dasboardHomeService.ChangeAppointment(this.selectedAppoinmentId)
          .subscribe((response: any) => {
            if (response) {
              this.sucussmsg= false;
              window.scrollTo(0, 0);
              this.CurrentMonthAppointments();
              setTimeout(() => { this.sucussmsg= true; }, 3000);
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
      changeName() {
        this.commonServiceService.change(1);
      }
}
