import { Component, OnInit } from '@angular/core';
import { User } from '../counsellor-my-profile/user';
import { ChatModel } from 'src/app/chat-room/chat.model';
import { ChatService } from 'src/app/chat-room/chat.service';
import { Router } from '@angular/router';
import { DashboardUpdateService } from '../../dashboard-update.service';
import { CommonServiceService } from 'src/app/common-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UpcomingAppointmentsServiceService } from '../../upcoming-appointments-service.service';

@Component({
  selector: 'app-counsellor-dashboard',
  templateUrl: './counsellor-dashboard.component.html',
  styleUrls: ['./counsellor-dashboard.component.css']
})
export class CounsellorDashboardComponent implements OnInit {
  isLoad = true;
  user = new User();
  ismsgsss=false;
  message: ChatModel = new ChatModel();
  messages: ChatModel[] = [];
  StatingMsg: string;
  url: any;
  currentUser: any;
  currentMenuIndex = 0;
  isMsgReciced=false;
  instantIndex: number = 0;
  isMsgRecicedJoin=false;
  isInstantChatRequest=false;
  isInstantChatRequestjoin=false;
  InstantAceApptid:any;
  clientnameshowpopup:any;
  counsollernameshowpopup:any;
  ChatstartSubmittedcounsoller:boolean=false;
  chatisstatrd:boolean=false;
  SenderclientId:any;
  Popupopen:any;
  tempArray = [];
  private commonServiceService:CommonServiceService;
  constructor(private chatService: ChatService ,private router: Router,private dashboardUpdateService: DashboardUpdateService,private upcomingAppointmentsServiceService: UpcomingAppointmentsServiceService,_commonServiceService:CommonServiceService) {
    this.commonServiceService=_commonServiceService;
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    if(this.currentUser.RoleId!=5)
    {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
   console.log(this.router.url);
    this.chatService
      .getMessages()
      .subscribe((message: ChatModel) => {
        if(message.CounsollerId==this.currentUser.UserId){
          console.log(message);
          this.clientnameshowpopup=message.ClientName;
          this.counsollernameshowpopup=this.currentUser.FirstName;
          if(message.text=="InstantChatRequest" && message.senderId==this.SenderclientId && !this.ismsgsss)
          {
            if (this.dashboardUpdateService.InstantchatPopupstop == false) {
              this.StatingMsg = message.text;
              this.ismsgsss = true;
              this.isInstantChatRequest = true;
              setTimeout(() => {    //<<<---    using ()=> syntax
                this.ismsgsss = false;
                this.isMsgRecicedJoin = false;
              }, 20000);
            }
          }
          if(message.text=="Join" && !this.isMsgRecicedJoin && message.senderId==this.SenderclientId)
          {
            this.StatingMsg = message.text;
           // this.ismsgsss=true;
            this.InstantAceApptid=message.InstantAceApptid;
            this.isInstantChatRequestjoin=true;
            this.isInstantChatRequest=false;
            this.isMsgRecicedJoin=true;
            this.router.navigate([`/dashboard-counsellor/counsellor-chatroom/` + this.InstantAceApptid + ``]);
          }
        //  console.log(message);
        if(message.text=="Alive")
        {
          this.StatingMsg = message.text;
         this.SenderclientId= message.senderId;
         //this.ismsgsss=true;
         console.log("Receive YesLive " +  new Date());
         this.sendMessageinstant("YesAlive");
         this.isMsgReciced=true;
        }
        }

      });

  }

  ngOnInit() {
    this.loadScript();
    this.commonServiceService.getEmittedValue()
    .subscribe(item => this.currentMenuIndex=item);
    if(this.router.url=='/dashboard-counsellor')
    this.currentMenuIndex=1;
    if(this.router.url=='/dashboard-counsellor/counsellor-home')
    this.currentMenuIndex=1;
 else if(this.router.url=='/dashboard-counsellor/counsellor-bookinghistory')
this.currentMenuIndex=3;
 else if(this.router.url=='/dashboard-counsellor/counsellor-upcomingappointment')
this.currentMenuIndex=5;

    this.ChatstartSubmittedcounsoller = this.dashboardUpdateService.ChatstartSubmittedcounsoller;
    this.user = JSON.parse(localStorage.getItem('UserDetails'));
    this.disableLoader();
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
  }

  disableLoader() {
    setTimeout(() => {    //<<<---    using ()=> syntax
      this.isLoad = false;
    }, 3000);
  }

  onMenuClick(index) {
    this.dashboardUpdateService.intervaltimestopcounsoller=false;
    this.currentMenuIndex = index;
    if(index==0){
      if(this.dashboardUpdateService.ChatstartSubmittedcounsoller){
       this.chatisstatrd=true;
      }
      else{
        if(this.dashboardUpdateService.ChatstartSubmittedvideo)
        {
          this.dashboardUpdateService.ChatstartSubmittedvideo=false;
          window.location.href='/dashboard-counsellor/counsellor-myprofile';
        }
        else{
        this.router.navigate([`/dashboard-counsellor/counsellor-myprofile`]);
        this.isLoad = true;
        this.disableLoader();
        }

      }
    }
    if(index==1) {
      if(this.dashboardUpdateService.ChatstartSubmittedcounsoller){
       this.chatisstatrd=true;
      }
      else {
        if(this.dashboardUpdateService.ChatstartSubmittedvideo)
        {
          this.dashboardUpdateService.ChatstartSubmittedvideo=false;
          window.location.href='/dashboard-counsellor/counsellor-home';
        }
        else{
        this.router.navigate([`/dashboard-counsellor/counsellor-home`]);
        this.isLoad = true;
        this.disableLoader();
        }

      }
    }
      if(index==3){
        if(this.dashboardUpdateService.ChatstartSubmittedcounsoller){
         this.chatisstatrd=true;
        }
        else{
          if(this.dashboardUpdateService.ChatstartSubmittedvideo)
          {
            this.dashboardUpdateService.ChatstartSubmittedvideo=false;
            window.location.href='/dashboard-counsellor/counsellor-bookinghistory';
          }
          else{
          this.router.navigate([`/dashboard-counsellor/counsellor-bookinghistory`]);
          this.isLoad = true;
          this.disableLoader();
          }

        }
    }
    if(index==5){
      if(this.dashboardUpdateService.ChatstartSubmittedcounsoller){
       this.chatisstatrd=true;
      }
      else{
        if(this.dashboardUpdateService.ChatstartSubmittedvideo)
          {
            this.dashboardUpdateService.ChatstartSubmittedvideo=false;
            window.location.href='/dashboard-counsellor/counsellor-upcomingappointment';
          }
          else{
        this.router.navigate([`/dashboard-counsellor/counsellor-upcomingappointment`]);
        this.isLoad = true;
        this.disableLoader();
          }


      }
  }// after few sec
  }
  Yesmodel(){
    this.ismsgsss=false;
    this.isMsgRecicedJoin =false;
    if(this.isInstantChatRequest) {
      this.sendMessageinstant("YesInstantChatRequest")
    }
    else if(this.isInstantChatRequestjoin){

      this.router.navigate([`/dashboard-counsellor/counsellor-chatroom/` + this.InstantAceApptid + ``]);
    }
    else{
    this.sendMessageinstant("YesAlive")
    }
  }
  Cancelmodel(){
    this.ismsgsss=false;
  this.sendMessageinstant("NoInstantChatRequest")

  }
  sendMessageinstant(msg) {
    this.message.text=msg;
    this.message.date = new Date;
    this.message.senderId = this.currentUser.UserId;
    this.message.CounsollerId = this.currentUser.UserId;
    this.message.ClientId=this.SenderclientId;
    this.chatService.sendMessage(this.message);
    this.message = new ChatModel();
  }
  public loadScript() {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = '../assets/js/custom.js';
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  Yesmodelchatend(){
    this.isLoad = true;
    this.sendMessageCustomvideo();
    setTimeout(() => {

    this.dashboardUpdateService.intervaltvideocal=true;
    this.instantIndex = this.dashboardUpdateService.messages.length;
    this.tempArray=[];
    if (this.dashboardUpdateService.DashtempIndex != this.instantIndex) {
      if (this.dashboardUpdateService.DashtempIndex != 0) {
        let diff =  this.instantIndex-this.dashboardUpdateService.DashtempIndex;
        for (let i = 0; i < diff; i++) {
          this.tempArray.push(this.dashboardUpdateService.messages[this.dashboardUpdateService.DashtempIndex + i]);
        }
        console.log(this.tempArray);


      }else{
        this.tempArray=this.dashboardUpdateService.messages;
      }
      this.dashboardUpdateService.DashtempIndex = this.instantIndex;
    }

    this.upcomingAppointmentsServiceService.EndChatSessionEnded(this.dashboardUpdateService.ACEAppointmentId, this.tempArray)
    .subscribe((response: any) => {
      if (response) {
       this.sendMessageCustom();

      if(this.currentMenuIndex==0)
       {
      this.chatisstatrd=false;
      this.dashboardUpdateService.ChatstartSubmittedcounsoller=false
      window.location.href='/dashboard-counsellor/counsellor-myprofile';
     // this.router.navigate([`/dashboard-counsellor/counsellor-myprofile`]);
      this.disableLoader();
      }
      if(this.currentMenuIndex==1)
      {
     this.chatisstatrd=false;
     this.dashboardUpdateService.ChatstartSubmittedcounsoller=false
     window.location.href='/dashboard-counsellor/counsellor-home';
   //  this.router.navigate([`/dashboard-counsellor/counsellor-home`]);
     this.disableLoader();
     }
     if(this.currentMenuIndex==3)
     {
    this.chatisstatrd=false;
    this.dashboardUpdateService.ChatstartSubmittedcounsoller=false
    window.location.href='/dashboard-counsellor/counsellor-bookinghistory';
  //  this.router.navigate([`/dashboard-counsellor/counsellor-bookinghistory`]);
    this.disableLoader();
    }
   if(this.currentMenuIndex==5)
   {
  this.chatisstatrd=false;
  this.dashboardUpdateService.ChatstartSubmittedcounsoller=false
  window.location.href='/dashboard-counsellor/counsellor-upcomingappointment';
  //this.router.navigate([`/dashboard-counsellor/counsellor-upcomingappointment`]);
  this.disableLoader();

  }

      }
      else {

        this.disableLoader();
      }

    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    });

  },10000);

  }
  Cancelmodelchatend(){
    this.chatisstatrd=false;
  }
  sendMessageCustom() {
    this.message.date = new Date;
    this.message.text = "CounslloerafterchatEnded";
    this.message.MsgType = '0';
    this.message.senderId = this.currentUser.UserId;
    this.message.ACEAppointmentId =this.dashboardUpdateService.ACEAppointmentId;
    this.chatService.sendMessage(this.message);
    this.message = new ChatModel();
  }
  sendMessageCustomvideo() {
    this.message.date = new Date;
    this.message.text = "Video Call End";
    this.message.MsgType = '0';
    this.message.senderId = this.currentUser.UserId;
    this.message.ACEAppointmentId =this.dashboardUpdateService.ACEAppointmentId;
    this.chatService.sendMessage(this.message);
    this.message = new ChatModel();
  }

}
