import { Component, OnInit } from '@angular/core';
import{ BookingHistoryService } from '../../booking-history.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonServiceService } from 'src/app/common-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-counsellor-bookinghistory',
  templateUrl: './counsellor-bookinghistory.component.html',
  styleUrls: ['./counsellor-bookinghistory.component.css']
})
export class CounsellorBookinghistoryComponent implements OnInit {
  currentUser: any;
  bookinghtry: any = [];
  bookinghtyfamily: any = [];
  bookinghtyown: any = [];
  private commonServiceService:CommonServiceService;
  constructor(private router: Router,private BookingHistoryService: BookingHistoryService,_commonServiceService:CommonServiceService) {
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

}

