import { Component, OnInit } from '@angular/core';
import { User } from '../Counsellor/counsellor-my-profile/user';
import { CounsellorMyProfileService } from '../Counsellor/counsellor-my-profile/counsellor-my-profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardUpdateService } from '../dashboard-update.service';
import { Router, ActivatedRoute } from '@angular/router';
import{CommonServiceService} from '../common-service.service';
import { DasboardHomeService } from '../dasboard-home.service';
import { UpcomingAppointmentsServiceService } from '../upcoming-appointments-service.service';
import { ChatModel } from '../chat-room/chat.model';
import { ChatService } from '../chat-room/chat.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class PortalDashboardComponent implements OnInit {
  showquataEmptymsg=false;
  isLoad = true;
  pagename:string;
  loadComponent:boolean=false;
  user = new User();
  currentUser: any;
  imgType: boolean = false;
  FileType: any;
  picture: any;
  fileToUpload: File;
  files: any;
  imgURL: string = '';
  noImage: boolean = true;
  private router: Router;
  ClientDashboardSessions:any;
  private route: ActivatedRoute;
  currentMenuIndex = 0;
  ChatstartSubmitted: boolean = false;
  chatisstatrd:boolean=false;
  chatcheckmaking:boolean=false;
  message: ChatModel = new ChatModel();
  onMain:number;
  private counsellorMyProfileService: CounsellorMyProfileService;
  private commonServiceService:CommonServiceService;
  constructor( private dasboardHomeService: DasboardHomeService,_counsellorMyProfileService: CounsellorMyProfileService,_commonServiceService:CommonServiceService,private dashboardUpdateService: DashboardUpdateService,private upcomingAppointmentsServiceService: UpcomingAppointmentsServiceService,_route: ActivatedRoute, _router: Router, private chatService: ChatService) {
    this.counsellorMyProfileService = _counsellorMyProfileService;
    this.commonServiceService=_commonServiceService;
    this.route = _route;
    this.router = _router;


  }

  ngOnInit() {
    this.loadScript();
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.commonServiceService.getEmittedValue()
    .subscribe(item => this.currentMenuIndex=item);


    if(this.router.url=='/dashboard/booking')
      this.currentMenuIndex=2;
   else if(this.router.url=='/dashboard/home')
this.currentMenuIndex=1;
   else if(this.router.url=='/dashboard/bookinghistory')
this.currentMenuIndex=3;
else if(this.router.url=='/dashboard/chatroom')
this.currentMenuIndex=4;
else if(this.router.url=='/dashboard/upcomingappointments')
this.currentMenuIndex=5;
else if(this.router.url=='/dashboard')
this.currentMenuIndex=1;
    //here u neeed to check this.router.url, if url has booking history then u set proper index
    this.ChatstartSubmitted = this.dashboardUpdateService.ChatstartSubmitted;
    this.user = JSON.parse(localStorage.getItem('UserDetails'));
    this.user.ProfilePhoto = JSON.parse(localStorage.getItem('ProfilePhoto'));
    this.commonServiceService.getEmittedProfileValue()
    .subscribe(item => this.user.ProfilePhoto=item);
    this.disableLoader();
    this.imgURL = this.user.ProfilePhoto;
  }

  disableLoader() {
    setTimeout(() => {    //<<<---    using ()=> syntax
      this.isLoad = false;
    }, 3000);
  }

  onMenuClick(index) {
    this.dashboardUpdateService.intervaltimestop=false;
    this.currentMenuIndex = index;
    if(index==0){
      if(this.dashboardUpdateService.ChatstartSubmitted){
       this.chatisstatrd=true;
      }
      else{
        if(this.dashboardUpdateService.ChatstartSubmittedvideo)
        {
          this.dashboardUpdateService.ChatstartSubmittedvideo=false;
          window.location.href='/dashboard/myprofile';
        }
        else{
                this.router.navigate([`/dashboard/myprofile`]);
                this.isLoad = true;
                this.disableLoader();
        }
        
              }
    }
    if(index==1) {
      if(this.dashboardUpdateService.ChatstartSubmitted){
       this.chatisstatrd=true;
      }
      else {
        if(this.dashboardUpdateService.ChatstartSubmittedvideo)
        {
          this.dashboardUpdateService.ChatstartSubmittedvideo=false;
          window.location.href='/dashboard/home';
        }
        else{
        this.router.navigate([`/dashboard/home`]);
        this.isLoad = true;
        this.disableLoader();
        }

      }
    }
    if(index==2){
      if(this.dashboardUpdateService.ChatstartSubmitted){
       this.chatisstatrd=true;
      }
      else{
        if(this.dashboardUpdateService.ChatstartSubmittedvideo)
        {
          this.dashboardUpdateService.ChatstartSubmittedvideo=false;
          window.location.href='/dashboard/booking';
        }
        else{
        this.router.navigate([`/dashboard/booking`]);
        this.isLoad = true;
        this.disableLoader();
        }

      }
  }
      if(index==3){
        if(this.dashboardUpdateService.ChatstartSubmitted){
         this.chatisstatrd=true;
        }
        else{
          if(this.dashboardUpdateService.ChatstartSubmittedvideo)
          {
            this.dashboardUpdateService.ChatstartSubmittedvideo=false;
            window.location.href='/dashboard/bookinghistory';
          }
          else{
            this.router.navigate([`/dashboard/bookinghistory`]);
            this.isLoad = true;
            this.disableLoader();
          }
  
  
          }
    }


  if(index==4){
    if(this.dashboardUpdateService.ChatstartSubmitted){
     this.chatisstatrd=true;
    }
    else{
      window.location.href='/dashboard/chatroom';
      /*this.router.navigate([`/dashboard/chatroom`]);
      this.isLoad = true;
      this.disableLoader();
      setTimeout(() => {
        window.location.reload();
      },2000);*/
    }
}
if(index==5){
  if(this.dashboardUpdateService.ChatstartSubmitted){
   this.chatisstatrd=true;
  }
  else{
    if(this.dashboardUpdateService.ChatstartSubmittedvideo)
        {
          this.dashboardUpdateService.ChatstartSubmittedvideo=false;
          window.location.href='/dashboard/upcomingappointments';
        }
        else{
    this.router.navigate([`/dashboard/upcomingappointments`]);
    this.isLoad = true;
    this.disableLoader();
        }

  }
}// after few sec
  }
  selectPhoto(file: FileList) {
    this.picture = file.item(0).name;
    this.fileToUpload = file.item(0);
    const File = this.fileToUpload.name;
    //this.contentAreas.FileName = File.split('.')[0];
    this.files = File.split('.');
    this.user.FileType = this.files[this.files.length - 1];
    var regex = new RegExp("(jpg|png|jpeg)$");
    if (regex.test(this.user.FileType.toLowerCase())) {
      //this.imgType = false;
      //console.log('filetype is correct');
    }
    else {
      //this.imgType = true;
      alert("file type must be jpg,png or jpeg");
      return;
    }
    this.noImage = false;

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgURL = event.target.result;
      var image = new Image();

    };


    reader.readAsDataURL(this.fileToUpload);

    this.uploadphoto()
  }
  uploadphoto() {
    if (this.imgURL != '')
      this.user.Base64Data = this.imgURL.split(',')[1];
    this.counsellorMyProfileService.updatephoto(this.user)
      .subscribe((data: any) => {
        console.log(data);
        if (data.IsSuccess) {
          alert("updated");
          //this.toasterService.pop('success', 'Success Toaster', 'ContentArea Added Successfully');
          //this.ChangeView();
          //this.GetContentAreas();

        }
      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  loadMyChildComponent() {
    this.loadComponent = true;
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
  makebooking() {
  this.isLoad=true;
    this.dasboardHomeService.GetClientDashboard(this.user.UserId, this.user.ACEClientId)
      .subscribe((response: any) => {
        if (response) {
          this.ClientDashboardSessions = response.Result;
          if((this.ClientDashboardSessions.AllowedAppts-this.ClientDashboardSessions.UsedAppts)==0)
          {
            this.currentMenuIndex=2;
             if(this.dashboardUpdateService.ChatstartSubmitted){
               this.chatisstatrd=true;
               this.isLoad=false;
               this.chatcheckmaking=true;
              }
              else{

             this.isLoad=false;
            this.showquataEmptymsg=true;
            return;

              }

          }
          else{
            this.currentMenuIndex=2;

            if(this.currentMenuIndex==2){
              if(this.dashboardUpdateService.ChatstartSubmitted){
               this.chatisstatrd=true;
               this.isLoad=false;
              }
              else{
                if(this.dashboardUpdateService.ChatstartSubmittedvideo)
                {
                  this.dashboardUpdateService.ChatstartSubmittedvideo=false;
                  window.location.href='/dashboard/booking';
                }
                else{
                this.router.navigate([`/dashboard/booking`]);
                 //this.isLoad = true;
                this.isLoad=false;
                }
                // this.disableLoader();

              }
            }
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
  Yesmodelchatend(){
    this.isLoad = true;
   this.dashboardUpdateService.intervaltvideocal=true;
     this.sendMessageCustom();
     this.sendMessageCustomvideo();
     setTimeout(() => {
      if(this.currentMenuIndex==0)
       {
      this.chatisstatrd=false;
      this.dashboardUpdateService.ChatstartSubmitted=false
      window.location.href='/dashboard/myprofile';
     // this.router.navigate([`/dashboard/myprofile`]);
      this.disableLoader();
      }
      if(this.currentMenuIndex==1)
      {
     this.chatisstatrd=false;
     this.dashboardUpdateService.ChatstartSubmitted=false
     window.location.href='/dashboard/home';
    // this.router.navigate([`/dashboard/home`]);
     this.disableLoader();
     }
     if(this.currentMenuIndex==2)
     {
    this.chatisstatrd=false;
    this.dashboardUpdateService.ChatstartSubmitted=false
    window.location.href='/dashboard/booking';
   // this.router.navigate([`/dashboard/home`]);
    this.disableLoader();
    }
    //  if(this.currentMenuIndex==2)
    //   {
    //     if(this.chatcheckmaking){
    //       this.chatisstatrd=false;
    //       this.dashboardUpdateService.ChatstartSubmitted=false
    //       this.showquataEmptymsg=true;
    //       window.location.href='/dashboard/home';
    //      // this.router.navigate([`/dashboard/home`]);
    //       this.disableLoader();
    //     }
    //     else {
    //  this.chatisstatrd=false;
    //  this.dashboardUpdateService.ChatstartSubmitted=false
    //  window.location.href='/dashboard/booking';
    // // this.router.navigate([`/dashboard/booking`]);
    //  this.disableLoader();
    //     }
    //  }
     if(this.currentMenuIndex==3)
     {
    this.chatisstatrd=false;
    this.dashboardUpdateService.ChatstartSubmitted=false
    window.location.href='/dashboard/bookinghistory';
   // this.router.navigate([`/dashboard/bookinghistory`]);
    this.disableLoader();
    }
    if(this.currentMenuIndex==4)
    {
   this.chatisstatrd=false;
   this.dashboardUpdateService.ChatstartSubmitted=false
   window.location.href='/dashboard/chatroom';
  // this.router.navigate([`/dashboard/chatroom`]);
   this.disableLoader();
   }
   if(this.currentMenuIndex==5)
   {
  this.chatisstatrd=false;
  this.dashboardUpdateService.ChatstartSubmitted=false
  window.location.href='/dashboard/upcomingappointments';
  //this.router.navigate([`/dashboard/upcomingappointments`]);
  this.disableLoader();

  }
},15000);
  }
  Cancelmodelchatend(){
    this.chatisstatrd=false;
  }
  closeModel() {
    this.showquataEmptymsg= false;
 }
 sendMessageCustom() {
  this.message.date = new Date;
  this.message.text = "ClientafterchatEnded";
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
