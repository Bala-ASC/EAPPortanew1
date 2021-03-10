import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InitMasterService } from '../../init-master.service';
import { ActivatedRoute } from '@angular/router';
import { ChatModel } from '../../chat-room/chat.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatService } from '../../chat-room/chat.service';
import { DasboardHomeService } from '../../dasboard-home.service';
import { UpcomingAppointmentsServiceService } from '../../upcoming-appointments-service.service';
import { DashboardUpdateService } from '../../dashboard-update.service';
import { $ } from 'protractor';
import * as _jquery from 'jquery';
import { CommonServiceService } from '../../common-service.service';
declare function app(): any;
@Component({
  selector: 'app-direct-video-chat',
  templateUrl: './direct-video-chat.component.html',
  styleUrls: ['./direct-video-chat.component.css']
})
export class DirectVideoChatComponent implements OnInit {


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
  private commonServiceService:CommonServiceService;
  isCallEnd: boolean = false;
  constructor(private route: ActivatedRoute,
    private initMasterService: InitMasterService,
    private chatService: ChatService,
    private dasboardHomeService: DasboardHomeService,

    private upcomingAppointmentsServiceService: UpcomingAppointmentsServiceService,private dashboardUpdateService: DashboardUpdateService,_commonServiceService:CommonServiceService) {
      this.commonServiceService=_commonServiceService;
      this.ACEAppointmentId = this.route.snapshot.params["id"];
     }


  ngOnInit() {
    this.getClientdetail();
    this.changeName();
    this.isClientConnected = false;
    this.isCounsellorConnected = false;
    this.initMasterService.getServiceBaseUrl('../assets/js/voximplant.js');
    this.initMasterService.getServiceBaseUrl('../assets/js/bootstrap-dialog.js');
    this.initMasterService.getServiceBaseUrl('../assets/js/customload.js');
    this.initMasterService.getServiceBaseUrl('../assets/js/app.js');
    //this.initMasterService.ScriptsRef();
    this.initMasterService.getServiceBaseUrl('../assets/js/bootstrap.min.js');
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    console.log(this.currentUser);
    this.chatService
      .getMessages()
      .subscribe((message: ChatModel) => {
        if (this.IsCheckChatOneToOne(message)) {
          console.log(message);
          if (message.MsgType == '0') {
            if (message.text == 'Video Call End') {
              if (!this.isCallEnd) {
                this.isCallEnd = true;
                _jquery('#EndCallforBoth').click();
                this.isCounsellorConnected = false;
                this.isClientConnected = false; this.dashboardUpdateService.ChatstartSubmitted = false;
                this.dashboardUpdateService.ChatstartSubmittedcounsoller = false;
              }
            }
            else if (message.text == 'VideoDisabled') {
              console.log('VideoDisabled Event Call');
              if (this.currentLiveChatAppts.UserId != message.senderId)
                _jquery('#VideoDisabled').click();

            }
            else if (this.currentLiveChatAppts.ClientRoleID != 5 && message.text == 'Counsellor Connected' && this.isCounsellorConnected == false) {
              //Client section
              this.StatingMsg = `Your Counsellor, ${this.currentLiveChatAppts.CounsellorName ? this.currentLiveChatAppts.CounsellorName : ''}  has  joined `;
              this.isCounsellorConnected = true;
              this.isClientConnected = true;
              this.dashboardUpdateService.ChatstartSubmitted = true;
              this.dashboardUpdateService.ChatstartSubmittedcounsoller = true;
              // _jquery('#Userlogin').click();
              this.sendMessageCustom('Client Connected');

            }
            else if (this.currentLiveChatAppts.ClientRoleID == 5 && message.text == 'Client Connected' && this.isClientConnected == false) {
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
              this.dashboardUpdateService.ChatstartSubmitted = true;
              this.dashboardUpdateService.ChatstartSubmittedcounsoller = true;
              // _jquery('#Userlogin').click();
              this.sendMessageCustom('Counsellor Connected');
            }

            if (message.text != 'Video Call End' && !this.isCallEnd && message.text != 'VideoDisabled')
            {
              if(this.currentLiveChatAppts.EndDateDiffMins > 0){
                if(this.currentLiveChatAppts.StartDateDiffMins < 10  || this.currentLiveChatAppts.StartDateDiffMins==10){
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


    this.CurrentAppointments(this.ACEAppointmentId);

  }
  VideoCallInit() {
    if (this.currentLiveChatAppts.ClientRoleID == 5 && this.isClientConnected && this.isCounsellorConnected && !this.isClientCounsellorLive) {
      //  this.callCreate.nativeElement.click();
      // _jquery(this.callCreate.nativeElement).click();
      // document.getElementById('callButton').click();
      console.log('Counsellor Login Event Call');
      this.isClientCounsellorLive = true;
      _jquery('#Userlogin').click();
    }
    else if (this.currentLiveChatAppts.ClientRoleID != 5 && this.isCounsellorConnected && this.isClientConnected && !this.isClientCounsellorLive) {
      // this.callCreate.nativeElement.click();
      // _jquery(this.callCreate.nativeElement).click();
      // document.getElementById('callButton').click();
      console.log('Client Login Event Call');
      this.isClientCounsellorLive = true;
      _jquery('#Userlogin').click();
    }
  }
  toggleVideoSharing() {
    this.sendMessageCustom('VideoDisabled');
  }
  IsVisibleTextMssg() {
    if (this.currentLiveChatAppts.ClientRoleID == 5 && this.isClientConnected) {
      this.IsVisibleText = true;

    } else if (this.isCounsellorConnected) {
      this.IsVisibleText = true;

    }

  }
  EndCallforClientCouns() {
    if (confirm("Are you sure to disconnect the call?")) {
      this.upcomingAppointmentsServiceService.EndChatSession(this.ACEAppointmentId,this.messages)
      .subscribe((response: any) => {
        if (response) {
          this.dashboardUpdateService.ChatstartSubmitted = false;
          window.location.reload();
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
    this.message.senderId = this.currentLiveChatAppts.UserId;
    this.message.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
    this.chatService.sendMessage(this.message);
    this.message = new ChatModel();
  }
  sendMessageCustom(msg: string) {
    this.message.date = new Date;
    this.message.text = msg;
    this.message.MsgType = '0';
    this.message.senderId = this.currentLiveChatAppts.UserId;
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



          console.log(this.currentLiveChatAppts);
          //--------------------------------------------
          if (this.currentLiveChatAppts.ClientRoleID == 5) {
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
    if (this.currentLiveChatAppts.ClientRoleID == 5) {
      this.callingUser = this.currentLiveChatAppts.ClientVoximUser;
      Userjsonarray = JSON.stringify([{ 'UserName': this.currentLiveChatAppts.CounsellerVoximUser, 'Password': this.currentLiveChatAppts.CounsellerVoximPass }]);
    }
    else {
      this.callingUser = this.currentLiveChatAppts.CounsellerVoximUser;
      Userjsonarray = JSON.stringify([{ 'UserName':  this.currentLiveChatAppts.ClientVoximUser, 'Password':  this.currentLiveChatAppts.ClientVoximPass }]);
    }
    return Userjsonarray;
  }
  changeName() {
    this.commonServiceService.change(0);
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
}

