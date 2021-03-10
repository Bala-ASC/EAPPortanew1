import { Component, OnInit } from '@angular/core';
import{ BookingHistoryService } from '../booking-history.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonServiceService } from '../common-service.service';
import { DasboardHomeService } from '../dasboard-home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  isLoad = false;
  showquataEmptymsg=false;
  currentUser: any;
  bookinghtry: any = [];
  bookinghtyfamily: any = [];
  bookinghtyown: any = [];
  ClientDashboardSessions: any;
  private commonServiceService:CommonServiceService;
  constructor(private dasboardHomeService: DasboardHomeService,private router: Router,private BookingHistoryService: BookingHistoryService,_commonServiceService:CommonServiceService) {
    this.commonServiceService=_commonServiceService;
  }

  ngOnInit() {
    this.changeName();
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.BookingHistory();
  }
  BookingHistory()
  {
      this.BookingHistoryService.BookingHistory(this.currentUser.UserId)
      .subscribe((response : any) => {
            if(response)
            {
              this.bookinghtry = response.Result;
              this.bookinghtyfamily = this.bookinghtry.filter(function (item) {
                return item.IsForFamilyMember === true;
              });
              this.bookinghtyown = this.bookinghtry.filter(function (item) {
                return item.IsForFamilyMember != true;
              });
            }
            else{

            }

      },(err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  changeName() {
    this.commonServiceService.change(3);
  }
  makebooking() {
    this.isLoad=true;
      this.dasboardHomeService.GetClientDashboard(this.currentUser.UserId, this.currentUser.ACEClientId)
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
   ClickInstantchattop(){
    window.location.href='/dashboard/chatroom';
   }

}
