import { Component, OnInit,HostListener, ViewChild, ElementRef, Renderer } from '@angular/core';
import { InitMasterService } from '../init-master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatModel } from '../chat-room/chat.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatService } from '../chat-room/chat.service';
import { DasboardHomeService } from '../dasboard-home.service';
import { UpcomingAppointmentsServiceService } from '../upcoming-appointments-service.service';
import { DashboardUpdateService } from '../dashboard-update.service';
import { $ } from 'protractor';
import * as _jquery from 'jquery';
import { CommonServiceService } from '../common-service.service';
declare function app(): any;

@Component({
  selector: 'app-video-chat-room',
  templateUrl: './video-chat-room.component.html',
  styleUrls: ['./video-chat-room.component.css']
})
export class VideoChatRoomComponent implements OnInit {
  // @HostListener('window:beforeunload', ['$event'])
  // public doSomething($event) {
  //   if (this.isCounsellorConnected || this.isClientConnected) {
  //     //this.dashboardUpdateService.intervaltimestopcounsoller==false;
  //     this.message.date = new Date;
  //     this.message.text = 'Video Call End';
  //     this.message.MsgType = '0';
  //     this.message.senderId = this.currentUser.UserId;
  //     this.message.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
  //     this.chatService.sendMessage(this.message);
  //     this.message = new ChatModel();
  //     // this.sendMessageCustom('CounsollerEndchat'); // <---- this logs to the console.
  //     let part = this.el.nativeElement.querySelector('.card-text');
  //     this.renderer.setElementStyle(part, 'display', 'block');
  //     return false;
  //   }

  // }

  toggled: boolean = false;
  isListView: boolean = true;
  currentUser: any;
  message: ChatModel = new ChatModel();
  messages: ChatModel[] = [];
  userId: any;
  ChatUserArray = [84, 405];
  isTrue: boolean = false;
  currentMonthAppts: any = [];
  currentLiveChatAppts: any = [];
  isClientCounsellorLive: boolean = false;
  isClientConnected: boolean = false;
  isCounsellorConnected: boolean = false;
  StatingMsg: string;
  videoChatUserArray: Array<any> = [];
  ACEAppointmentId: any;
  IsVisibleText: boolean = false;
  callingUser: any;
  Appoitmenttimeovertimeinterval: boolean = false;
  private commonServiceService: CommonServiceService;
  isCallEnd: boolean = false;
  Appoitmenttimertimestart: boolean = false;
  Chatisdisconectnternet:boolean=false;
  Chatappoitmettimeisover: boolean = false;
  Chatisstatrdendedstop: boolean = false;
  videocalstartdasboard: boolean = false;
  videocalstartdasboardcounsoller: boolean = false;
  CheckCounsollerIsOnlineonChatFlag: boolean = false;
  CheckCientIsOnlineonChatFlag: boolean = false;
  CounsellerOnchat: any[] = [];
  ClintOnchat: any[] = [];
  constructor(private route: ActivatedRoute,
    private initMasterService: InitMasterService,
    private chatService: ChatService,
    private dasboardHomeService: DasboardHomeService,

    private upcomingAppointmentsServiceService: UpcomingAppointmentsServiceService, private dashboardUpdateService: DashboardUpdateService, _commonServiceService: CommonServiceService, private router: Router,private el: ElementRef,
    private renderer: Renderer) {
    this.commonServiceService = _commonServiceService;
  }


  ngOnInit() {
    this.dashboardUpdateService.intervaltimestop = true;
    this.dashboardUpdateService.ChatstartSubmittedvideo = true;
    this.dashboardUpdateService.intervaltimestopcounsoller = true;
    this.dashboardUpdateService.ChatstartSubmittedcounsoller = false;
    this.dashboardUpdateService.ChatstartSubmitted = false;
    this.changeName();
    //this.isClientConnected = false;
    //  this.isCounsellorConnected = false;
    this.initMasterService.getServiceBaseUrl('../assets/js/voximplant.js');
    this.initMasterService.getServiceBaseUrl('../assets/js/bootstrap-dialog.js');
    this.initMasterService.getServiceBaseUrl('../assets/js/customload.js');
    this.initMasterService.getServiceBaseUrl('../assets/js/app.js');
    //this.initMasterService.ScriptsRef();
    setInterval(() => {
      this.Appoitmenttimeover();
    }, 1000);
    setInterval(() => {
      this.vediocalenddasboard();
    }, 1000);
    setInterval(() => {
      this.vediocalenddasboardcounsoller();
    }, 1000);
    setInterval(() => {
      this.Appoitmenttistart();
    }, 1000);
    // setInterval(() => {
    //   this.CheckCounsollerIsOnlineonChat();
    // }, 60000);
    // setInterval(() => {
    //   this.CheckClientOnlineonChat();
    // }, 60000);


    this.initMasterService.getServiceBaseUrl('../assets/js/bootstrap.min.js');
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    console.log(this.currentUser);
    this.chatService
      .getMessages()
      .subscribe((message: ChatModel) => {
        if (this.IsCheckChatOneToOne(message)) {
          console.log(message);
          if (message.MsgType == '0') {
            if (message.text == 'Video Call End' && message.senderId != this.currentUser.UserId) {
              if (!this.isCallEnd) {
                this.Chatisstatrdendedstop = true;
                this.isCallEnd = true;
                // _jquery('#EndCallforBoth').click();
                this.isCounsellorConnected = false;
                this.isClientConnected = false; this.dashboardUpdateService.ChatstartSubmitted = false;
                this.dashboardUpdateService.ChatstartSubmittedcounsoller = false;
              }
            }
            else if (message.text == 'VideoDisabled') {
              console.log('VideoDisabled Event Call');
              if (this.currentUser.UserId != message.senderId)
                _jquery('#VideoDisabled').click();

            }
            else if (message.senderId != this.currentUser.UserId && message.text == "CounsellorOnchatStill") {
              this.sendMessageCustom('YesCounsellorOnchatStill');

            }
            else if (message.senderId != this.currentUser.UserId && message.text == "YesCounsellorOnchatStill") {
              this.YesCounsollerOnchat(message.senderId)
            }
            else if (message.senderId != this.currentUser.UserId && message.text == "ClientOnchatStill") {
              this.sendMessageCustom('YesClientOnchatStill');

            }
            else if (message.senderId != this.currentUser.UserId && message.text == "YesClientOnchatStill") {
              this.YesCounsolleclient(message.senderId)
            }
            else if (this.currentUser.RoleId != 5 && message.text == "Counsellor Connected" && this.isCounsellorConnected == false) {
              //Client section
              this.StatingMsg = `Your Counsellor, ${this.currentLiveChatAppts.CounsellorName ? this.currentLiveChatAppts.CounsellorName : ''}  has  joined `;
              this.isCounsellorConnected = true;
              this.isClientConnected = true;
              //    this.dashboardUpdateService.ChatstartSubmitted = true;
              // this.dashboardUpdateService.ChatstartSubmittedcounsoller = true;
              this.Appoitmenttimeovertimeinterval = true;
              // _jquery('#Userlogin').click();
              this.sendMessageCustom('Client Connected');

            }
            else if (this.currentUser.RoleId == 5 && message.text == "Client Connected" && this.isClientConnected == false) {
              //Counsellor section
              if(this.currentLiveChatAppts.IsForFamilyMember)
              {
                this.StatingMsg = `Your Client, ${this.currentLiveChatAppts.FMFirstName ? this.currentLiveChatAppts.FMFirstName : ''} has joined `;
              }
              else{
                this.StatingMsg = `Your Client, ${this.currentLiveChatAppts.Username ? this.currentLiveChatAppts.Username : ''} has joined `;
              }

              this.isClientConnected = true;
              this.isCounsellorConnected = true;
              //   this.dashboardUpdateService.ChatstartSubmitted = true;
              //  this.dashboardUpdateService.ChatstartSubmittedcounsoller = true;
              this.Appoitmenttimeovertimeinterval = true;
              // _jquery('#Userlogin').click();
              this.sendMessageCustom('Counsellor Connected');
            }

            if (message.text != 'Video Call End' && !this.isCallEnd && message.text != 'VideoDisabled') {
              if (this.currentLiveChatAppts.EndDateDiffMins > 0) {
                if (this.currentLiveChatAppts.StartDateDiffMins < 10 || this.currentLiveChatAppts.StartDateDiffMins == 10) {
                  this.VideoCallInit();
                }

              }

            }

          }
          else
            this.messages.push(message);
        }


        // this.initMasterService.getServiceBaseUrl('../assets/js/Chatmodule.js');
      });

    this.ACEAppointmentId = this.route.snapshot.params["id"];
    this.dashboardUpdateService.ACEAppointmentId = this.ACEAppointmentId;
    this.CurrentAppointments(this.ACEAppointmentId);

  }
  VideoCallInit() {
    if (this.currentUser.RoleId == 5 && this.isClientConnected && this.isCounsellorConnected && !this.isClientCounsellorLive) {
      //  this.callCreate.nativeElement.click();
      //  this.dashboardUpdateService.ChatstartSubmitted = true;

      // _jquery(this.callCreate.nativeElement).click();
      // document.getElementById('callButton').click();
      console.log('Counsellor Login Event Call');
      this.isClientCounsellorLive = true;
      this.videocalstartdasboardcounsoller = true;
      this.CheckCientIsOnlineonChatFlag = true;
      _jquery('#Userlogin').click();
      this.dashboardUpdateService.ChatstartSubmittedcounsoller = true;
    }
    else if (this.currentUser.RoleId != 5 && this.isCounsellorConnected && this.isClientConnected && !this.isClientCounsellorLive) {
      // this.callCreate.nativeElement.click();
      // _jquery(this.callCreate.nativeElement).click();
      // document.getElementById('callButton').click();

      console.log('Client Login Event Call');
      this.isClientCounsellorLive = true;
      this.videocalstartdasboard = true;
      this.CheckCounsollerIsOnlineonChatFlag = true;
      _jquery('#Userlogin').click();

      this.dashboardUpdateService.ChatstartSubmitted = true;
    }
  }
  toggleVideoSharing() {
    this.sendMessageCustom('VideoDisabled');
  }
  IsVisibleTextMssg() {
    if (this.currentUser.RoleId == 5 && this.isClientConnected) {
      this.IsVisibleText = true;

    } else if (this.isCounsellorConnected) {
      this.IsVisibleText = true;

    }

  }
  EndCallforClientCouns() {
    if (confirm("Are you sure to disconnect the call?")) {
      this.upcomingAppointmentsServiceService.EndChatSession(this.ACEAppointmentId, this.messages)
        .subscribe((response: any) => {
          if (response) {
            this.dashboardUpdateService.ChatstartSubmitted = false;

          }
          else {


          }

        }, (err: HttpErrorResponse) => {
          console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        });
      this.isCallEnd = true;
      // this.isCounsellorConnected = false;
      // this.isClientConnected = false;
      this.sendMessageCustom('Video Call End');
      _jquery('#EndCallforBoth').click();


    }
    else {

    }
  }
  sendMessage() {
    this.message.date = new Date;
    this.message.senderId = this.currentUser.UserId;
    this.message.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
    this.chatService.sendMessage(this.message);
    this.message = new ChatModel();
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
          //this.currentLiveChatAppts = this.currentMonthAppts.find(x => x.ACEAppointmentId = id);
          this.ChatUserArray.push(this.currentLiveChatAppts.UserId);
          this.ChatUserArray.push(this.currentLiveChatAppts.CounsellerId);

          if (this.currentLiveChatAppts.StartDateDiffMins > 10) {
            this.Appoitmenttimertimestart = true;
          }

          console.log(this.currentLiveChatAppts);
          //--------------------------------------------
          if (this.currentUser.RoleId == 5) {
            if(this.currentLiveChatAppts.IsForFamilyMember)
              {
                this.StatingMsg = `Your Client, ${this.currentLiveChatAppts.FMFirstName ? this.currentLiveChatAppts.FMFirstName : ''} has not joined yet.`;
              }
              else{
                this.StatingMsg = `Your Client, ${this.currentLiveChatAppts.Username ? this.currentLiveChatAppts.Username : ''} has not joined yet.`;
              }

            this.sendMessageCustom('Counsellor Connected');
            // setTimeout(() => {
            //   _jquery('#Userlogin').click();
            // }, 2000);
          }
          else {
            this.StatingMsg = `Your Counsellor, ${this.currentLiveChatAppts.CounsellorName ? this.currentLiveChatAppts.CounsellorName : ''} has not joined yet.`;
            this.sendMessageCustom('Client Connected');
            // setTimeout(() => {
            //   _jquery('#Userlogin').click();
            // }, 2000);
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
    if (message.ACEAppointmentId == this.ACEAppointmentId) {
      this.isTrue = true;
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

  BindUserCredentials() {
    let Userjsonarray = '';
    if (this.currentUser.RoleId == 5) {
      this.callingUser = this.currentLiveChatAppts.ClientVoximUser;
      Userjsonarray = JSON.stringify([{ 'UserName': this.currentLiveChatAppts.CounsellerVoximUser, 'Password': this.currentLiveChatAppts.CounsellerVoximPass }]);
    }
    else {
      this.callingUser = this.currentLiveChatAppts.CounsellerVoximUser;
      Userjsonarray = JSON.stringify([{ 'UserName': this.currentLiveChatAppts.ClientVoximUser, 'Password': this.currentLiveChatAppts.ClientVoximPass }]);
    }
    return Userjsonarray;
  }
  changeName() {
    this.commonServiceService.change(0);
  }
  Appoitmenttimeover() {
    if (this.currentUser.RoleId == 5) {
      if (this.Appoitmenttimeovertimeinterval && this.dashboardUpdateService.intervaltimestopcounsoller) {
        this.upcomingAppointmentsServiceService.Appoitmenttimeover(this.ACEAppointmentId)
          .subscribe((response: any) => {
            if (response) {
              if (response.Result.ChatTimeDiffMinsposite == 0) {
                this.dashboardUpdateService.ChatstartSubmittedcounsoller = false;
                // _jquery('#EndCallforBoth').click();
                this.Chatappoitmettimeisover = true;

              }
              //
            }
            else {


            }

          }, (err: HttpErrorResponse) => {
            console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
          });
      }
    }
    else {
      if (this.Appoitmenttimeovertimeinterval && this.dashboardUpdateService.intervaltimestop) {
        this.upcomingAppointmentsServiceService.Appoitmenttimeover(this.ACEAppointmentId)
          .subscribe((response: any) => {
            if (response) {
              if (response.Result.ChatTimeDiffMinsposite == 0) {
                this.dashboardUpdateService.ChatstartSubmitted = false;
                this.Chatappoitmettimeisover = true;
                //   _jquery('#EndCallforBoth').click();

              }
              //
            }
            else {


            }

          }, (err: HttpErrorResponse) => {
            console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
          });
      }
    }

  }
  Appoitmenttistart() {
    if (this.currentUser.RoleId == 5) {
      if (this.Appoitmenttimertimestart && this.dashboardUpdateService.intervaltimestopcounsoller) {
        this.upcomingAppointmentsServiceService.Appoitmenttistart(this.ACEAppointmentId)
          .subscribe((response: any) => {
            if (response) {
              if (response.Result.StartDateDiffMins == 10) {
                this.Appoitmenttimertimestart = false;
                window.location.reload();
                // this.CurrentAppointments(this.ACEAppointmentId);
              }

            }
            else {


            }

          }, (err: HttpErrorResponse) => {
            console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
          });
      }
    }
    else {
      if (this.Appoitmenttimertimestart && this.dashboardUpdateService.intervaltimestop) {
        this.upcomingAppointmentsServiceService.Appoitmenttistart(this.ACEAppointmentId)
          .subscribe((response: any) => {
            if (response) {
              if (response.Result.StartDateDiffMins == 10) {
                this.Appoitmenttimertimestart = false;
                window.location.reload();
                // this.CurrentAppointments(this.ACEAppointmentId);
              }

            }
            else {


            }

          }, (err: HttpErrorResponse) => {
            console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
          });
      }
    }

  }
  YesmodelchatendOk() {
    this.Chatappoitmettimeisover = false;
    _jquery('#EndCallforBoth').click();
  }
  YesmodelchatendOkclient() {
    this.Chatisstatrdendedstop = false;
    this.CheckCientIsOnlineonChatFlag=false;
    this.CheckCientIsOnlineonChatFlag=false;
    _jquery('#EndCallforBoth').click();
  }
  vediocalenddasboard() {
    if (this.videocalstartdasboard) {

      if (this.dashboardUpdateService.intervaltvideocal) {
        // alert(this.dashboardUpdateService.intervaltvideocal);
        //  this.sendMessageCustom('Video Call End');
        _jquery('#EndCallforBothdasboard').click();
        this.dashboardUpdateService.ChatstartSubmitted = false;
        this.dashboardUpdateService.intervaltvideocal = false;
        this.videocalstartdasboard = false;
      }
      //
      // this.dashboardUpdateService.intervaltvideocal=false;
    }

  }
  vediocalenddasboardcounsoller() {
    if (this.videocalstartdasboardcounsoller) {

      if (this.dashboardUpdateService.intervaltvideocal) {
        //alert(this.dashboardUpdateService.intervaltvideocal);
        //  this.sendMessageCustom('Video Call End');
        _jquery('#EndCallforBothdasboard').click();
        this.videocalstartdasboardcounsoller = false;
        this.dashboardUpdateService.intervaltvideocal = false;
        this.dashboardUpdateService.ChatstartSubmittedcounsoller = false;
      }
      //
      // this.dashboardUpdateService.intervaltvideocal=false;
    }
  }
  // CheckCounsollerIsOnlineonChat() {
  //   if (this.CheckCounsollerIsOnlineonChatFlag && this.dashboardUpdateService.intervaltimestop) {
  //     this.CounsellerOnchat = [];
  //     this.sendMessageCustom('CounsellorOnchatStill')
  //     setTimeout(() => {
  //       let Checkcounsloer = this.CounsellerOnchat.length
  //       if (Checkcounsloer == 0) {
  //         this.Chatisdisconectnternet = true;
  //       }
  //     }, 20000);

  //   }
  // }
  YesCounsollerOnchat(Id) {
    if (this.CounsellerOnchat.indexOf(Id) == -1) {
      this.CounsellerOnchat.push(Id);
    }
  }
  // CheckClientOnlineonChat() {
  //   if (this.CheckCientIsOnlineonChatFlag && this.dashboardUpdateService.intervaltimestop) {
  //     this.ClintOnchat = [];
  //     this.sendMessageCustom('ClientOnchatStill')
  //     setTimeout(() => {
  //       let Checkcounsloer = this.ClintOnchat.length
  //       if (Checkcounsloer == 0) {
  //         this.Chatisdisconectnternet = true;
  //       }
  //     }, 20000);
  //   }

  // }
  YesCounsolleclient(Id) {
    if (this.ClintOnchat.indexOf(Id) == -1) {
      this.ClintOnchat.push(Id);
    }
  }
  YesmodelchatendOkInternet(){
    this.Chatisstatrdendedstop = false;
    this.CheckCientIsOnlineonChatFlag=false;
    this.CheckCientIsOnlineonChatFlag=false;
    _jquery('#EndCallforBoth').click();
  }
}
