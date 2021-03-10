import { Component, OnInit, HostListener } from '@angular/core';
import { InitMasterService } from '../../init-master.service';
import { DirectChatModel } from './direct-chat-model';
import { DirectChatRoomService } from './direct-chat-room.service';
import { isI18NAttribute } from '@angular/compiler/src/render3/view/i18n';
import { DasboardHomeService } from '../../dasboard-home.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UpcomingAppointmentsServiceService } from '../../upcoming-appointments-service.service';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { async } from 'rxjs/internal/scheduler/async';
import { DashboardUpdateService } from '../../dashboard-update.service';
import { CommonServiceService } from '../../common-service.service';
import { Transcript } from '../../chat-room/transcript';

@Component({
  selector: 'app-direct-chat-room',
  templateUrl: './direct-chat-room.component.html',
  styleUrls: ['./direct-chat-room.component.css']
})
export class DirectChatRoomComponent implements OnInit {
  Chatendyourclient:boolean=false;
  Chatisstatrdendedstop:boolean=false;
  Chatappoitmettimeisover:boolean=false;
  Intchatradio = 0;
  Instntmessages: Transcript[] = [];
  toggled: boolean = false;
  isListView: boolean = true;
  currentUser: any;
  today = new Date();
  jstoday = '';
  message: DirectChatModel = new DirectChatModel();
  custmessage: DirectChatModel = new DirectChatModel();
  messages: DirectChatModel[] = [];
  userId: any;
  ChatUserArray = [84, 405];
  isTrue: boolean = false;
  currentMonthAppts: any = [];
  currentLiveChatAppts: any = [];
  isClientCounsellorLive: boolean = false;
  isClientConnected: boolean = false;
  isCounsellorConnected: boolean = false;
  StatingMsg: string;
  ACEAppointmentId: any;
  CounsollerId: any;
  InstantChatCounsellers: any[] = [];
  InstantChatAppt: any;
  InstantAceApptid: any;
  isYesAlivemessage: boolean = false;
  isInstantChatMessage: any = 0;
  intId: any;
  VarExitLoop: any = 0;
  Connected: any = 0;
  buttomtimest: boolean = false;
  IsValidTimeForInstantChat: any;
  Nocounllormsg: boolean = false;
  instantchatyes: boolean = false;
  InstantChatyes: any;
  ChatstartSubmitted: boolean = false;
  isInstantChatMessageflase = 0;
  InstantChatCounsellerschat: any[] = [];
  Chatstarttyping: boolean = false;
  LastSentTyping = new Date();
  LastReceiveTyping = new Date();
  FirstTimeSent: boolean = false;
  Connectedcounsoller:boolean= false;
  Nextbuttonshows:boolean=false;
  buttontimestmsg: boolean = false;
  isInstantChatMessageshow: any = 0;
  isLoad = false;
  private commonServiceService:CommonServiceService;
  constructor(private route: ActivatedRoute, private router: Router, private initMasterService: InitMasterService, private chatService: DirectChatRoomService, private dasboardHomeService: DasboardHomeService, private upcomingAppointmentsServiceService: UpcomingAppointmentsServiceService,
    private dashboardUpdateService: DashboardUpdateService,_commonServiceService:CommonServiceService) { 
      this.commonServiceService=_commonServiceService;
      this.ACEAppointmentId = this.route.snapshot.params["id"];
    }

  ngOnInit() {
    this.getClientdetail();
    this.changeName();
    this.initMasterService.getServiceBaseUrl('../assets/js/customload.js');
   // this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    setInterval(() => {
      this.ClearTying();
    }, 5000);
    console.log(this.currentUser);
    this.chatService
      .getMessages()
      .subscribe((message: DirectChatModel) => {
        console.log(message);
        if (this.IsCheckChatOneToOne(message)) {
          if(this.isTrue==true){
          if (message.MsgType == '0') {
            if(message.text=="Counsollertyping")
            {
              this.LastReceiveTyping = new Date();
             this.Chatstarttyping=true;
            }
            if(message.text=="Counsollertypingstop")
            {
              
             this.Chatstarttyping=false;
            }
            if(message.text=="CounslloerafterchatEnded")
            {
              this.Chatisstatrdendedstop=true;
             this.Chatstarttyping=false;
             this.dashboardUpdateService.ChatstartSubmitted = false;
            }
            if(message.text=="CounsollerEndchat")
            {
              this.Chatendyourclient=true;
              this.Chatisstatrdendedstop=true;
              this.Connectedcounsoller=false;
              this.Chatstarttyping=false;
              this.dashboardUpdateService.ChatstartSubmitted = false;
            }
            if (this.currentLiveChatAppts.ClientRoleID!=5 && message.text == 'Counsellor Connected' && this.isCounsellorConnected == false) {
              //Client section
              this.StatingMsg = `Your Counsellor, ${this.currentLiveChatAppts.CounsellorName ? this.currentLiveChatAppts.CounsellorName : ''}  has  joined `;
              this.isCounsellorConnected = true;
              this.Connectedcounsoller=true;
              this.sendMessageCustom('Client Connected');
            }
            else if ( this.currentLiveChatAppts.ClientRoleID ==5&& message.text == 'Client Connected' && this.isClientConnected == false) {
              //Counsellor section
              this.StatingMsg = `Your Client, ${this.currentLiveChatAppts.Username ? this.currentLiveChatAppts.Username : ''} has joined `;
              this.isClientConnected = true;
              this.sendMessageCustom('Counsellor Connected');
            }
          }

          else {
            if (message.text == 'YesAlive') {
              console.log("Receive YesLive " + new Date());
              this.isYesAlivemessage = true;
              this.sendMessageinstant('InstantChatRequest');
              this.isInstantChatMessageflase = 1;
            }
            // if (message.text == 'YesInstantChatRequest') {
            //   console.log("Receive YesInstantChatRequest " + new Date());
            //   this.isInstantChatMessage = 1;
            //   this.upcomingAppointmentsServiceService.CreateInstantChatAppt(this.currentUser.UserId, this.CounsollerId)
            //     .subscribe((response: any) => {
            //       if (response) {
            //         debugger
            //         console.log(response.Result);
            //         this.InstantChatAppt = response.Result;
            //         this.InstantAceApptid = this.InstantChatAppt.ACEAppointmentId;
            //         // this.router.navigate(['/dashboard/chatroom']);
            //         this.sendMessageinstant("Join");
            //       //  setTimeout(() => {
            //           this.router.navigate([`/dashboard/chatroom/` + this.InstantChatAppt.ACEAppointmentId + ``]);
            //        // }, 700);
                 
            //       }
            //       if (message.text == 'NoInstantChatRequest') {
            //         this.isInstantChatMessage = 2;
            //       }

            //     }, (err: HttpErrorResponse) => {
            //       console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
            //     });
            //   }
            if (message.text!="" && message.text != "YesAlive" && message.text!="Alive" && message.text != "InstantChatRequest" && message.text != "YesInstantChatRequest" && message.text != "Join" &&message.text!="NoInstantChatRequest") {
              this.messages.push(message);
              this.Instntmessages.push(message);
            }

            //alert(this.messages.push(message.text));
            this.ChatStartedOn();
          }
        }

        }


        this.initMasterService.getServiceBaseUrl('../assets/js/Chatmodule.js');
      });

    this.ACEAppointmentId = this.route.snapshot.params["id"];
    this.CurrentAppointments(this.ACEAppointmentId);


  }

  sendMessage() {
    if(this.message.text!="") {
    this.message.date = new Date;
    this.message.Message=this.message.text;
    this.message.Type="Client";
    this.message.Name=this.currentLiveChatAppts.Username;
    this.message.senderId = this.currentLiveChatAppts.UserId;
    this.message.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
    this.chatService.sendMessage(this.message);
    this.message = new DirectChatModel();
    }
  }
  sendMessageCustom(msg: string) {
    this.message.date = new Date;
    this.message.text = msg;
    this.message.MsgType = '0';
    this.message.senderId = this.currentLiveChatAppts.UserId;
    this.message.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
    this.chatService.sendMessage(this.message);
    this.message = new DirectChatModel();
  }

  CurrentAppointments(id) {
    this.upcomingAppointmentsServiceService.GetAppointmentDetails(id, 0)
      .subscribe((response: any) => {
        if (response) {
          this.ChatUserArray = [];
          console.log(response.Result);
          this.currentLiveChatAppts = response.Result;
          // this.currentLiveChatAppts = this.currentMonthAppts.find(x => x.ACEAppointmentId = id);
          this.ChatUserArray.push(this.currentLiveChatAppts.UserId);
          this.ChatUserArray.push(this.currentLiveChatAppts.CounsellerId);
          console.log(this.currentLiveChatAppts);
          if(this.currentLiveChatAppts.IsInstantChat != true){
          //--------------------------------------------       
          if (this.currentLiveChatAppts.ClientRoleID == 5) {
            this.StatingMsg = `Your Client, ${this.currentLiveChatAppts.Username ? this.currentLiveChatAppts.Username : ''} has not joined yet.`;
            this.sendMessageCustom('Counsellor Connected');
          }
          else {
            this.StatingMsg = `Your Counsellor, ${this.currentLiveChatAppts.CounsellorName ? this.currentLiveChatAppts.CounsellorName : ''} has not joined yet.`;
            this.sendMessageCustom('Client Connected');
          }
        }
        else {
          if (this.currentLiveChatAppts.ClientRoleID == 5) {
            this.StatingMsg = `Your Client, ${this.currentLiveChatAppts.Username ? this.currentLiveChatAppts.Username : ''}  has  joined `;
            //this.sendMessageCustom('Counsellor Connected');
          }
          else {
            this.StatingMsg = `Your Counsellor, ${this.currentLiveChatAppts.CounsellorName ? this.currentLiveChatAppts.CounsellorName : ''}  has  joined `;
           // this.sendMessageCustom('Client Connected');
           this.Connectedcounsoller=true;
          }
        }
          //----------------------------------------------------
        }

      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  SetClientLogin() {
    this.chatService
      .SetLoginClient(this.currentUser);

  }
  IsCheckChatOneToOne(message) {
    this.isTrue = false;
    if (this.ACEAppointmentId!=undefined) {
      if (message.ACEAppointmentId == this.ACEAppointmentId) {
        this.isTrue = true;
      }
    }
    else {
      if (message.CounsollerId == this.CounsollerId) {
        this.isTrue = true;
      }
    }
    return this.isTrue;
  }
  IsCheckChatEnabled() {


  }
  handleSelection(event) {
    console.log(event.char);
    this.message.text += event.char;
  }
  sendcontinue() {
this.isLoad=true;
    this.buttonshowcheck();
    setTimeout(() => {
      this.isLoad=false;
      this.isListView = false;
    //  console.log(this.Intchatradio)
    // alert(this.Intchatradio);
    if (this.Intchatradio == 2 && this.buttomtimest == true) {
      this.buttontimestmsg=true;
      this.isInstantChatMessageshow=1;
      this.upcomingAppointmentsServiceService.GetInstantChatCounsellers()
        .subscribe((response: any) => {
          if (response) {

            console.log(response.Result);
            this.InstantChatCounsellers = response.Result;
            // this.AsynLoopCounsellers();
            // this.InstantChatCounsellers.forEach(element => {
            this.AsynLoopCounsellers();




          }
          else {


          }

        }, (err: HttpErrorResponse) => {
          console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        });
    }
    // else if(this.Intchatradio == 1) {
    //     this.instantchatyes = true;
    //     this.isInstantChatMessageshow=2;
    //   debugger;
    //   this.upcomingAppointmentsServiceService.SendEmailForInstantchat(this.currentLiveChatAppts.UserId)
    //     .subscribe((response: any) => {
    //       if (response) {

    //         console.log(response.Result);
    //         this.InstantChatyes = response.Result;
          



    //       }
    //       else {


    //       }

    //     }, (err: HttpErrorResponse) => {
    //       console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    //     });
    // }
    else{
      this.isInstantChatMessageshow=3;
    }
    }, 10000);
   
  }
  resolveAfter1Second(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 1000);
    });
  }

  resolveCombineFunctions(x) {
    return new Promise(resolve => {
      this.AsyncLiveCheck();
      this.AsyncRequestAcceptCheck();
      resolve(x);
    });
  }

  async AsynLoopCounsellers() {


    let totalUsers = this.InstantChatCounsellers.length;
    // this.InstantChatCounsellers.forEach(element => {
    for (let cuser = 0; cuser < totalUsers; cuser++) {
      this.VarExitLoop = 0;
      this.CounsollerId = this.InstantChatCounsellers[cuser].CounsellerId;
     // console.log("Counseller Id : " + this.CounsollerId);
     // console.log("Live Calling" + new Date());
      this.sendMessageinstant("Alive");
      console.log("Live Called " + new Date());
      //this.AsyncCobmineCheck() ;

      for (let sec = 0; sec < 4; sec++) {
       // console.log("Live check : " + sec);
      //  console.log("Live check : " + new Date());
        const isLiveCheckValue = <number>await this.resolveAfter1Second(1);
        // this.Delay(1000);
        if (this.isYesAlivemessage) {
         // console.log("Live check : Found " + sec + " at " + new Date());
          sec = 10;
        }
      }
     // console.log("Outside Live check : " + new Date());
      if (this.isYesAlivemessage) {
      //  console.log("Inside Chat check : " + new Date());
        for (let sec = 0; sec < 20; sec++) {
          const isLiveValue = <number>await this.resolveAfter1Second(1);
          //this.Delay(1000);
         // console.log("Chat check : " + sec + " at " + new Date());
          if (this.isInstantChatMessage == 1) {
         //   console.log("Chat check - Yes : " + sec + " at " + new Date());
            sec = 25;
          }
          else if (this.isInstantChatMessage == 2) {
          //  console.log("Chat check - No : " + sec + " at " + new Date());
            sec = 25;
          }
        }
      }
      if (this.isInstantChatMessage == 1) {
       // console.log("exiting loop " + new Date());
        //no need to check other counseller if accepted
       // this.Nocounllormsg = true;
        return false;
      }
    };
    // this.Nocounllormsg=true;
  }

  async Delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  async AsyncLiveCheck() {
    for (let sec = 0; sec < 2; sec++) {

      const isLiveValue = <number>await this.resolveAfter1Second(1);
      if (this.isYesAlivemessage)
        sec = 3;
    }
  }
  async AsyncCobmineCheck() {
    //const isLiveValue = <number>await this.resolveCombineFunctions(1);
    for (let sec = 0; sec < 2; sec++) {
      console.log("Live check : " + sec);
      const isLiveValue = <number>await this.resolveAfter1Second(1);
      if (this.isYesAlivemessage) {
        console.log("Live check : Found " + sec);
        sec = 3;
      }
    }
    for (let sec = 0; sec < 60; sec++) {
      const isLiveValue = <number>await this.resolveAfter1Second(1);
      console.log("Chat check : " + sec);
      if (this.isInstantChatMessage == 1) {
        console.log("Chat check - Yes : " + sec);
        sec = 61;
      }
      else if (this.isInstantChatMessage == 2) {
        console.log("Chat check - No : " + sec);
        sec = 61;
      }
    }

  }

  async AsyncRequestAcceptCheck() {
    for (let sec = 0; sec < 60; sec++) {

      const isLiveValue = <number>await this.resolveAfter1Second(1);
      if (this.isInstantChatMessage == 1)
        sec = 61;
      else if (this.isInstantChatMessage == 2)
        sec = 61;
    }
  }



  sendMessageinstant(msg) {
    this.message.text = msg;
    this.message.date = new Date;
    this.message.senderId = this.currentLiveChatAppts.UserId;
    this.message.CounsollerId = this.CounsollerId;
    this.message.InstantAceApptid = this.InstantAceApptid;
    this.message.ClientName = this.currentUser.FirstName+' '+this.currentUser.LastName;
    this.chatService.sendMessage(this.message);
    this.message = new DirectChatModel();

  }
  buttonshowcheck() {
    this.upcomingAppointmentsServiceService.IsValidTimeForInstantChat()
      .subscribe((response: any) => {
        if (response) {
          console.log(response.Result);
          this.IsValidTimeForInstantChat = response.Result;
          if (this.IsValidTimeForInstantChat.UtcstartTime > "08:00:00" && this.IsValidTimeForInstantChat.UtcstartTime < "20:00:00") {
            this.buttomtimest = true;
          }

        }
        else {


        }

      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  EndChatSession(ACEAppointmentId) {
    this.ClientEndchat();
    this.dashboardUpdateService.ChatstartSubmitted = false;
    window.location.reload();
    // this.upcomingAppointmentsServiceService.EndChatSession(this.currentUser.ACEClientId,ACEAppointmentId,this.messages)
    //   .subscribe((response: any) => {
    //     debugger;
    //     if (response) {
         
    //       //this.router.navigate([`/dashboard/upcomingappointments`]);

    //     }
    //     else {


    //     }

    //   }, (err: HttpErrorResponse) => {
    //     console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    //   });

  }
  ChatStartedOn() {
    if (this.messages.length == 1) {
      this.ChatstartSubmitted = true;
      this.dashboardUpdateService.ChatstartSubmitted = true;
      this.upcomingAppointmentsServiceService.ChatStartedOn(this.ACEAppointmentId)
        .subscribe((response: any) => {
          if (response) {
            // this.router.navigate([`/dashboard/upcomingappointments`]);

          }
          else {


          }

        }, (err: HttpErrorResponse) => {
          console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        });
    }

  }
  Typingshowfunction(){
    
    let date1 = new Date().getTime();
    let date2 = new Date(this.LastSentTyping).getTime();
    let timeDiff = date1 - date2;  //milli sec
    let secDiff = timeDiff / 1000;
    if(secDiff > 30 || this.FirstTimeSent==false)
    {
      this.FirstTimeSent = true;
      this.LastSentTyping = new Date();
      this.custmessage.date = new Date;
      this.custmessage.text="Clienttyping";
      this.custmessage.MsgType="0";
      this.custmessage.senderId = this.currentLiveChatAppts.UserId;
      this.custmessage.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
      this.chatService.sendCustMessage(this.custmessage);
     // this.message = new ChatModel();
    }
    return true;
  }
  ClearTying()
  {
    let date1 = new Date().getTime();
    let date2 = new Date(this.LastReceiveTyping).getTime();
    
    let timeDiff = date1 - date2;  //milli sec
    let secDiff = timeDiff / 1000;
    
    if(secDiff > 30)
      this.Chatstarttyping = false;
  }
  Nextclickcontinue(){
    if(this.Intchatradio==2 ||this.Intchatradio==1)
    {
   this.Nextbuttonshows=true;
    }

  }
  changeName() {
    this.commonServiceService.change(4);
  }
  getClientdetail()
  {
  this.upcomingAppointmentsServiceService.GetACEclientId(this.ACEAppointmentId)
  .subscribe((response: any) => {
    if (response.IsSuccess) {
      this.currentUser=response.Result;
    }
    else {


    }

  }, (err: HttpErrorResponse) => {
    console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
  });
}
YesmodelchatendOk(){
  this.Chatisstatrdendedstop=false;
  this.Chatappoitmettimeisover=false;
  this.dashboardUpdateService.ChatstartSubmitted=false;
  window.location.reload();
}
ClientEndchat(){
  this.FirstTimeSent = true;
  this.LastSentTyping = new Date();
  this.custmessage.date = new Date;
  this.custmessage.text="ClientEndchat";
  this.custmessage.MsgType="0";
  this.custmessage.senderId = this.currentUser.UserId;
  this.custmessage.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
  this.chatService.sendCustMessage(this.custmessage);
 // this.message = new ChatModel(); 
}
}

