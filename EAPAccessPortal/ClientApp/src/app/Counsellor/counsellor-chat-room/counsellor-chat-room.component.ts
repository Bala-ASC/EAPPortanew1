
import { Component, OnInit ,HostListener, Renderer, ElementRef} from '@angular/core';
import { InitMasterService } from '../../init-master.service';
import { ChatModel } from '../../chat-room/chat.model';
import { Transcript } from '../../chat-room/transcript';
import { ChatService } from '../../chat-room/chat.service';
import { isI18NAttribute } from '@angular/compiler/src/render3/view/i18n';
import { DasboardHomeService } from '../../dasboard-home.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UpcomingAppointmentsServiceService } from '../../upcoming-appointments-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DashboardUpdateService } from '../../dashboard-update.service';
import { CommonServiceService } from 'src/app/common-service.service';
import * as $ from 'jquery';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-counsellor-chat-room',
  templateUrl: './counsellor-chat-room.component.html',
  styleUrls: ['./counsellor-chat-room.component.css']
})
export class CounsellorChatRoomComponent implements OnInit {

  // @HostListener('window:beforeunload', ['$event'])

  // public doSomething($event) {
  //   let partcon = this.el.nativeElement.querySelector('.card-text');
  //   this.renderer.setElementStyle(partcon, 'display', 'block');
  //   if (this.isClientConnected || this.Connectedcounsoller) {
  //     //this.dashboardUpdateService.intervaltimestopcounsoller==false;
  //     this.StoretranscripttoAce(1);
  //     this.message.date = new Date;
  //     this.message.text = 'CounsollerEndchat';
  //     this.message.MsgType = '0';
  //     this.message.senderId = this.currentUser.UserId;
  //     this.message.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
  //     this.chatService.sendMessage(this.message);
  //     this.message = new ChatModel();
  //    // this.sendMessageCustom('CounsollerEndchat'); // <---- this logs to the console.
  //    let part = this.el.nativeElement.querySelector('.card-text');
  //    this.renderer.setElementStyle(part, 'display', 'block');
  //     return false;
  //   }

  // }
  toggled: boolean = false;
  isListView: boolean = true;
  currentUser: any;
  message: ChatModel = new ChatModel();
  custmessage: ChatModel = new ChatModel();
  messages: ChatModel[] = [];
  Instntmessages: Transcript[] = [];
  CounsellerOnchat: any[] = [];
  userId: any;
  ChatUserArray = [84, 405];
  isTrue: boolean = false;
  currentMonthAppts: any = [];
  currentLiveChatAppts: any = [];
  isClientCounsellorLive: boolean = false;
  CheckCientIsOnlineonChatFlag:boolean=false;
  isClientConnected: boolean = false;
  isCounsellorConnected: boolean = false;
  StatingMsg: string;
  ACEAppointmentId: any;
  ChatstartSubmitted: boolean = false;
  Chatstarttyping: boolean = false;
  Chatendyourclient: boolean = false;
  LastSentTyping = new Date();
  LastReceiveTyping = new Date();
  FirstTimeSent: boolean = false;
  Connectedcounsoller: boolean = false;
  textvalueset: any;
  isLoad = false;
  Appoitmenttimeovertime: boolean = false;
  Appoitmenttimertimestart: boolean = false;
  Appoitmenttimeovertimeinterval: boolean = false;
  Chatisstatrdendedstop: boolean = false;
  Chatappoitmettimeisover: boolean = false;
  Schedulechattransript: boolean = false;
  Storetransript: boolean = false;
  Chatisdisconectnternet:boolean=false;
  private commonServiceService: CommonServiceService;
  instantIndex: number = 0;
  tempIndex: number = 0;
  tempArray = [];
  constructor(private route: ActivatedRoute, private router: Router, private initMasterService: InitMasterService, private chatService: ChatService, private dasboardHomeService: DasboardHomeService, private upcomingAppointmentsServiceService: UpcomingAppointmentsServiceService, private dashboardUpdateService: DashboardUpdateService,
    _commonServiceService: CommonServiceService,private el: ElementRef,
    private renderer: Renderer) {
    this.commonServiceService = _commonServiceService;
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    if(this.currentUser.RoleId!=5)
    {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.dashboardUpdateService.intervaltimestopcounsoller = true;
    this.changeName();
    this.initMasterService.getServiceBaseUrl('../assets/js/customload.js');
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    setInterval(() => {
      this.ClearTying();
    }, 5000);
    setInterval(() => {
      this.StoretranscripttoAce(0);
    }, 300000);
    setInterval(() => {
      this.Appoitmenttistart();
    }, 1000);
    setInterval(() => {
      this.Appoitmenttimeover();
    }, 1000);
  //   setInterval(() => {
  //   this.CheckClientOnlineonChat()
  // }, 60000);
    console.log(this.currentUser);
    this.chatService
      .getMessages()
      .subscribe((message: ChatModel) => {
        if (this.IsCheckChatOneToOne(message)) {
          if (this.isTrue == true) {
            if (message.MsgType == '0') {
              if (message.text == "Clienttyping") {
                this.LastReceiveTyping = new Date();
                this.Chatstarttyping = true;
              }
              if (message.text == "Clienttypingstop") {
                this.Chatstarttyping = false;
              }
              if (message.text == "ClientafterchatEnded") {
                this.Chatisstatrdendedstop = true;
                this.dashboardUpdateService.ChatstartSubmittedcounsoller = false;
              }
              if (message.text == "ClientEndchat") {
                this.Chatisstatrdendedstop = true;
                this.Chatendyourclient = true;
                this.Connectedcounsoller = false;
                this.Chatstarttyping = false;
                this.dashboardUpdateService.ChatstartSubmittedcounsoller = false;
              }
              if(message.text == "CounsellorOnchatStill")
              {
                this.sendMessageCustom('YesCounsellorOnchatStill');
              }
              if(message.text=="YesClientOnchatStill")
              {
                this.YesCounsollerOnchat(message.ClientId);
              }
              if (this.currentUser.RoleId != 5 && message.text == 'Counsellor Connected' && this.isCounsellorConnected == false) {
                //Client section
                this.StatingMsg = `Your Counsellor, ${this.currentLiveChatAppts.CounsellorName ? this.currentLiveChatAppts.CounsellorName : ''}  has  joined `;
                this.isCounsellorConnected = true;
                this.sendMessageCustom('Client Connected');
              }
              else if (this.currentUser.RoleId == 5 && message.text == 'Client Connected' && this.isClientConnected == false) {
                //Counsellor section
                if(this.currentLiveChatAppts.IsForFamilyMember)
              {
                this.StatingMsg = `Your Client, ${this.currentLiveChatAppts.FMFirstName ? this.currentLiveChatAppts.FMFirstName : ''} has joined `;
              }
              else{
                this.StatingMsg = `Your Client, ${this.currentLiveChatAppts.Username ? this.currentLiveChatAppts.Username : ''} has joined `;
              }

                this.isClientConnected = true;
                this.Connectedcounsoller = true;
                this.Storetransript=true;
                this.dashboardUpdateService.ChatstartSubmittedcounsoller = true;
                this.dashboardUpdateService.ACEAppointmentId = this.ACEAppointmentId;
                this.sendMessageCustom('Counsellor Connected');
              }
            }
            else
              if (message.text != "" && message.text != "YesAlive" && message.text != "Alive" && message.text != "InstantChatRequest" && message.text != "YesInstantChatRequest" && message.text != "Join" && message.text != "NoInstantChatRequest") {
                this.messages.push(message);
                this.Instntmessages.push(message);
              }
            this.ChatStartedOn();
          }
        }


        this.initMasterService.getServiceBaseUrl('../assets/js/Chatmodule.js');
      });

    this.ACEAppointmentId = this.route.snapshot.params["id"];
    this.dashboardUpdateService.ACEAppointmentId = this.ACEAppointmentId;
    this.CurrentAppointments(this.ACEAppointmentId);

  }

  ClearTying() {
    let date1 = new Date().getTime();
    let date2 = new Date(this.LastReceiveTyping).getTime();

    let timeDiff = date1 - date2;  //milli sec
    let secDiff = timeDiff / 1000;

    if (secDiff > 30)
      this.Chatstarttyping = false;
  }

  sendMessage() {
    if (this.message.text != "") {
      this.message.date = new Date;
      this.message.Message = this.message.text;
      this.message.Type = "Counsellor ";
      this.message.Name = this.currentLiveChatAppts.CounsellorName;
      this.message.senderId = this.currentUser.UserId;
      this.message.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
      this.chatService.sendMessage(this.message);
      this.message = new ChatModel();
    }
  }
  sendMessageCustom(msg: string) {
    this.message.date = new Date;
    this.message.text = msg;
    this.message.MsgType = '0';
    this.message.senderId = this.currentUser.UserId;
    this.message.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
    this.chatService.sendMessage(this.message);
    this.message = new ChatModel();
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
          //--------------------------------------------
          if (this.currentLiveChatAppts.IsInstantChat != true) {
            this.Schedulechattransript = true;
            if (this.currentLiveChatAppts.StartDateDiffMins > 10) {
              this.Appoitmenttimertimestart = true;
            }
            if (this.currentUser.RoleId == 5) {
              if(this.currentLiveChatAppts.IsForFamilyMember)
              {
                this.StatingMsg = `Your Client, ${this.currentLiveChatAppts.FMFirstName ? this.currentLiveChatAppts.FMFirstName : ''} has not joined yet.`;
              }
              else{
                this.StatingMsg = `Your Client, ${this.currentLiveChatAppts.Username ? this.currentLiveChatAppts.Username : ''} has not joined yet.`;
              }

              this.sendMessageCustom('Counsellor Connected');
              //  this.dashboardUpdateService.ChatstartSubmittedcounsoller=true;
            }
            else {
              this.StatingMsg = `Your Counsellor, ${this.currentLiveChatAppts.CounsellorName ? this.currentLiveChatAppts.CounsellorName : ''} has not joined yet.`;
              this.sendMessageCustom('Client Connected');
            }
            //----------------------------------------------------
          }
          else {
            if (this.currentUser.RoleId == 5 && this.currentLiveChatAppts.CounsellerId == this.currentUser.UserId) {
              this.StatingMsg = `Your Client, ${this.currentLiveChatAppts.Username ? this.currentLiveChatAppts.Username : ''}  has  joined `;
              //this.sendMessageCustom('Counsellor Connected');
              this.dashboardUpdateService.ChatstartSubmittedcounsoller = true;
              this.Connectedcounsoller = true;
              this.dashboardUpdateService.InstantchatPopupstop=true;
              this.Storetransript=true;
              this.Appoitmenttimeovertimeinterval = true;
            }
            else if (this.currentLiveChatAppts.CounsellerId == this.currentUser.UserId) {
              this.StatingMsg = `Your Counsellor, ${this.currentLiveChatAppts.CounsellorName ? this.currentLiveChatAppts.CounsellorName : ''}  has  joined `;
              // this.sendMessageCustom('Client Connected');
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
    if (this.ACEAppointmentId != 'undefined') {
      if (message.ACEAppointmentId == this.ACEAppointmentId) {
        this.isTrue = true;
      }
    }
    else {
      if (message.CounsellerId == this.currentUser.userId) {
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
    this.isListView = false;
  }
  sendMessageinstant(msg) {
    this.message.text = msg;
    this.message.date = new Date;
    this.message.senderId = this.currentUser.UserId;
    this.message.CounsollerId = this.currentUser.UserId;
    this.chatService.sendMessage(this.message);
    this.message = new ChatModel();
  }
  EndChatSession(ACEAppointmentId) {
    this.dashboardUpdateService.InstantchatPopupstop=false;
    this.StoretranscripttoAce(1);


    // this.upcomingAppointmentsServiceService.EndChatSession(this.currentUser.ACEClientId, ACEAppointmentId, this.Instntmessages)
    //   .subscribe((response: any) => {
    //     if (response) {
    //       this.CounsollerEndchat();
    //       this.dashboardUpdateService.ChatstartSubmittedcounsoller = false;
    //       this.router.navigate([`/dashboard-counsellor/counsellor-upcomingappointment`]);

    //     }
    //     else {


    //     }

    //   }, (err: HttpErrorResponse) => {
    //     console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    //   });

  }
  ChatStartedOn() {
    if (this.messages.length >= 1) {
      this.dashboardUpdateService.messages = this.messages;
      ///this.Appoitmenttimeover();
    }
    if (this.messages.length == 1) {
      this.CheckCientIsOnlineonChatFlag=true;
      this.Storetransript = true;
      this.Appoitmenttimeovertimeinterval = true;
      this.ChatstartSubmitted = true;



      // alert(this.dashboardUpdateService.ChatstartSubmittedcounsoller);
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
  Appoitmenttimeover() {
    if (this.Appoitmenttimeovertimeinterval && this.dashboardUpdateService.intervaltimestopcounsoller) {
      this.upcomingAppointmentsServiceService.Appoitmenttimeover(this.ACEAppointmentId)
        .subscribe((response: any) => {
          if (response) {
            //  alert(response.Result.ChatTimeDiffMinsposite);
            if (response.Result.ChatTimeDiffMinsposite <= 0) {
              this.Chatappoitmettimeisover = true;
              this.Connectedcounsoller = false;
              this.Appoitmenttimeovertime = true;
              this.dashboardUpdateService.ChatstartSubmittedcounsoller = false;
            }
            // this.router.navigate([`/dashboard/upcomingappointments`]);

          }
          else {


          }

        }, (err: HttpErrorResponse) => {
          console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        });
    }
  }
  Typingshowfunction() {
    setTimeout(() => {
      this.textvalueset = $("#textvalfornow").val();
      if (this.textvalueset != "") {
        let date1 = new Date().getTime();
        let date2 = new Date(this.LastSentTyping).getTime();
        let timeDiff = date1 - date2;  //milli sec
        let secDiff = timeDiff / 1000;
        if (secDiff > 30 || this.FirstTimeSent == false) {
          this.FirstTimeSent = true;
          this.LastSentTyping = new Date();
          this.custmessage.date = new Date;
          this.custmessage.text = "Counsollertyping";
          this.custmessage.MsgType = "0";
          this.custmessage.senderId = this.currentUser.UserId;
          this.custmessage.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
          this.chatService.sendCustMessage(this.custmessage);
          // this.message = new ChatModel();
        }
        return true;
      }
      else {
        this.FirstTimeSent = false;
        this.LastSentTyping = new Date();
        this.custmessage.date = new Date;
        this.custmessage.text = "Counsollertypingstop";
        this.custmessage.MsgType = "0";
        this.custmessage.senderId = this.currentUser.UserId;
        this.custmessage.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
        this.chatService.sendCustMessage(this.custmessage);
      }
    }, 500);
  }
  changeName() {
    this.commonServiceService.change(4);
  }
  CounsollerEndchat() {
    this.FirstTimeSent = true;
    this.LastSentTyping = new Date();
    this.custmessage.date = new Date;
    this.custmessage.text = "CounsollerEndchat";
    this.custmessage.MsgType = "0";
    this.custmessage.senderId = this.currentUser.UserId;
    this.custmessage.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
    this.chatService.sendCustMessage(this.custmessage);
    // this.message = new ChatModel();
  }
  Appoitmenttistart() {
    if (this.Appoitmenttimertimestart && this.dashboardUpdateService.intervaltimestopcounsoller) {
      this.upcomingAppointmentsServiceService.Appoitmenttistart(this.ACEAppointmentId)
        .subscribe((response: any) => {
          if (response) {
            if (response.Result.StartDateDiffMins == 10) {
              this.Appoitmenttimertimestart = false;
              window.location.reload();
              //this.CurrentAppointments(this.ACEAppointmentId);
            }

          }
          else {


          }

        }, (err: HttpErrorResponse) => {
          console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        });
    }
  }
  YesmodelchatendOk() {
    this.dashboardUpdateService.InstantchatPopupstop=false;
    this.CheckCientIsOnlineonChatFlag=false;
    this.StoretranscripttoAce(2);

  }
  StoretranscripttoAce(Inst) {
    debugger;
    if (this.Storetransript && this.dashboardUpdateService.intervaltimestopcounsoller) {
    this.instantIndex = this.Instntmessages.length;
    this.tempArray=[];
    if (this.tempIndex != this.instantIndex) {
      if (this.tempIndex != 0) {
        let diff =  this.instantIndex-this.tempIndex;
        for (let i = 0; i < diff; i++) {
          this.tempArray.push(this.Instntmessages[this.tempIndex + i]);
        }
        console.log(this.tempArray);


      }else{
        this.tempArray=this.Instntmessages;
      }
      this.tempIndex = this.instantIndex;
    }
    this.dashboardUpdateService.DashtempIndex=this.instantIndex;
    if(Inst==0){
       if(this.tempArray.length >0){

      this.upcomingAppointmentsServiceService.EndChatSession(this.ACEAppointmentId, this.tempArray)
        .subscribe((response: any) => {
          if (response) {
            // this.ClientEndchat();
            // this.dashboardUpdateService.ChatstartSubmitted = false;
            // this.router.navigate([`/dashboard/upcomingappointments`]);

          }
          else {


          }

        }, (err: HttpErrorResponse) => {
          console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        });
      }
    }
      else{

        if(this.tempArray.length >0){
        this.isLoad=true;
        this.upcomingAppointmentsServiceService.EndChatSessionEnded(this.ACEAppointmentId, this.tempArray)
        .subscribe((response: any) => {
          if (response) {
            if(Inst==1){
              this.CounsollerEndchat();
            this.Chatisstatrdendedstop = false;
         this.Chatappoitmettimeisover = false;
        this.dashboardUpdateService.intervaltimestopcounsoller = false;
        this.dashboardUpdateService.ChatstartSubmittedcounsoller = false;
        this.isLoad=false;
       this.router.navigate([`/dashboard-counsellor/counsellor-upcomingappointment`]);
            }
            else {
              this.CounsollerEndchat();
              this.dashboardUpdateService.ChatstartSubmittedcounsoller = false;
              this.dashboardUpdateService.intervaltimestopcounsoller=false;
               this.router.navigate([`/dashboard-counsellor/counsellor-upcomingappointment`]);
               this.isLoad=false;
            }

          }
          else {

            this.isLoad=false;
          }

        }, (err: HttpErrorResponse) => {
          console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        });
      }
      else{
        this.isLoad=true;
        this.upcomingAppointmentsServiceService.EndChatSessionMsg(this.ACEAppointmentId)
        .subscribe((response: any) => {
          if (response) {
            if(Inst==1){
              this.CounsollerEndchat();
            this.Chatisstatrdendedstop = false;
         this.Chatappoitmettimeisover = false;
        this.dashboardUpdateService.intervaltimestopcounsoller = false;
        this.dashboardUpdateService.ChatstartSubmittedcounsoller = false;
        this.isLoad=false;
       this.router.navigate([`/dashboard-counsellor/counsellor-upcomingappointment`]);
            }
            else {
              this.CounsollerEndchat();
              this.dashboardUpdateService.ChatstartSubmittedcounsoller = false;
              this.dashboardUpdateService.intervaltimestopcounsoller=false;
               this.router.navigate([`/dashboard-counsellor/counsellor-upcomingappointment`]);
               this.isLoad=false;
            }

          }
          else {

            this.isLoad=false;
          }

        }, (err: HttpErrorResponse) => {
          console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        });
      }
    }

     // this.isLoad=false;

  }

  }

  // CheckClientOnlineonChat() {
  //   if (this.CheckCientIsOnlineonChatFlag && this.dashboardUpdateService.intervaltimestopcounsoller) {
  //     let currentDate;
  //     let currMin = new Date().getMinutes();
  //     for (let i = 0; i < this.Instntmessages.length; i++) {
  //       if (this.Instntmessages[i].Type == "Client") {
  //         currentDate = this.Instntmessages[i].date;
  //       }
  //     }
  //     currentDate = new Date(currentDate).getMinutes();
  //     if ((currMin - currentDate) > 1) {
  //       this.CounsellerOnchat = [];
  //       this.sendMessageCustom('ClientOnchatStill')
  //       setTimeout(() => {
  //         let Checkcounsloer = this.CounsellerOnchat.length
  //         if (Checkcounsloer == 0) {
  //           this.Chatisdisconectnternet=true;
  //         }
  //       }, 20000);
  //     }
  //   }
  // }
  YesCounsollerOnchat(Id) {
    if (this.CounsellerOnchat.indexOf(Id) == -1) {
      this.CounsellerOnchat.push(Id);
    }
  }
  YesmodelchatendOkInternet(){
    this.Chatisdisconectnternet=false;
    this.dashboardUpdateService.InstantchatPopupstop=false;
    this.CheckCientIsOnlineonChatFlag=false;
    this.StoretranscripttoAce(2);
    window.location.href='/dashboard-counsellor/counsellor-upcomingappointment';
  }


}
