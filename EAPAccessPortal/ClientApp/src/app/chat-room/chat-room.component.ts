import { Component, OnInit, HostListener, Renderer, ElementRef } from '@angular/core';
import { InitMasterService } from '../init-master.service';
import { ChatModel } from './chat.model';
import { ChatService } from './chat.service';
import { Transcript } from '../chat-room/transcript';
import { isI18NAttribute } from '@angular/compiler/src/render3/view/i18n';
import { DasboardHomeService } from '../dasboard-home.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UpcomingAppointmentsServiceService } from '../upcoming-appointments-service.service';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { async } from 'rxjs/internal/scheduler/async';
import { DashboardUpdateService } from '../dashboard-update.service';
import { CommonServiceService } from '../common-service.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})

export class ChatRoomComponent implements OnInit {



  // @HostListener('window:beforeunload', ['$event'])
  // public doSomething($event) {
  //   if (this.isCounsellorConnected || this.Connectedcounsoller) {
  //     //this.dashboardUpdateService.intervaltimestopcounsoller==false;
  //     this.message.date = new Date;
  //     this.message.text = 'ClientEndchat';
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
  showquataEmptymsg = false;
  ClientDashboardSessions: any;
  Intchatradio = 0;
  toggled: boolean = false;
  isListView: boolean = true;
  currentUser: any;
  today = new Date();
  jstoday = '';
  message: ChatModel = new ChatModel();
  custmessage: ChatModel = new ChatModel();
  messages: ChatModel[] = [];
  Instntmessages: Transcript[] = [];
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
  Connectedcounsoller: boolean = false;
  Chatendyourclient: boolean = false;
  Nextbuttonshows: boolean = false;
  buttontimestmsg: boolean = false;
  isInstantChatMessageshow: any = 0;
  isLoad = false;
  textvalueset: any;
  Appoitmenttimeovertime: boolean = false;
  Appoitmenttimertimestart: boolean = false;
  Appoitmenttimeovertimeinterval: boolean = false;
  WaitTimeStart = new Date();
  WaitMinutes: any = 10;
  chatisstatrd: boolean = false;
  QuepostionFirst: boolean = false;
  currentMenuIndex = 0;
  chatcheckmaking: boolean = false;
  Chatisstatrdendedstop: boolean = false;
  Chatappoitmettimeisover: boolean = false;
  Chatisdisconectnternet:boolean=false;
  Yesalivecounsollerlist: any[] = [];
  LiveCounseller: any[] = [];
  CounsellerOnchat: any[] = [];
  avaliablecounsollerDetails: any[] = [];
  availCounslr: any[] = [];
  QueueId: any;
  Estimatedtime: any;
  Estimatetimeset: any;
  Nocounsoller: boolean = false;
  cliendidforcounsollercondtion: any;
  TimerId1: any;
  Instantchatsearchcounsoller: boolean = false;
  CheckCounsollerIsOnlineonChatFlag: boolean = false;
  Instantchatprocessstart: boolean = false;
  private commonServiceService: CommonServiceService;
  constructor(private route: ActivatedRoute, private router: Router, private initMasterService: InitMasterService, private chatService: ChatService, private dasboardHomeService: DasboardHomeService, private upcomingAppointmentsServiceService: UpcomingAppointmentsServiceService,
    private dashboardUpdateService: DashboardUpdateService, _commonServiceService: CommonServiceService,private el: ElementRef,
    private renderer: Renderer) {
    this.commonServiceService = _commonServiceService;
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    if(this.currentUser.RoleId!=(1 || 2))
    {
      localStorage.clear();
      this.router.navigate(['/login']);
    }

  }

  ngOnDestroy() {
    if (this.TimerId1) {
      clearInterval(this.TimerId1);
    }
  }

  ngOnInit() {
    this.message = new ChatModel();
    this.dashboardUpdateService.intervaltimestop = true;
    this.changeName();
    this.initMasterService.getServiceBaseUrl('../assets/js/customload.js');
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    setInterval(() => {
      this.ClearTying();
    }, 5000);
    setInterval(() => {
      this.Appoitmenttistart();
    }, 1000);

    setInterval(() => {
      this.Appoitmenttimeover();
    }, 1000);
    this.TimerId1 = setInterval(() => {
      if (this.QuepostionFirst && window.location.href.indexOf('dashboard/chatroom') != -1) {
        this.GetpostionofQueue();
      }
    }, 30000);
    // setInterval(() => {
    //   this.CheckCounsollerIsOnlineonChat();
    // }, 60000);



    console.log(this.currentUser);
    this.chatService
      .getMessages()
      .subscribe((message: ChatModel) => {
        if (this.IsCheckChatOneToOne(message)) {
          if (this.isTrue == true) {
            if (message.MsgType == '0') {
              if (message.text == "Counsollertyping") {
                this.LastReceiveTyping = new Date();
                this.Chatstarttyping = true;
              }
              else if (message.text == "Counsollertypingstop") {

                this.Chatstarttyping = false;
              }
              else if (message.text == "CounslloerafterchatEnded") {
                this.Chatisstatrdendedstop = true;
                this.Chatstarttyping = false;
                this.dashboardUpdateService.ChatstartSubmitted = false;
              }
              else if (message.text == "CounsollerEndchat") {
                this.Chatendyourclient = true;
                this.Chatisstatrdendedstop = true;
                this.Connectedcounsoller = false;
                this.Chatstarttyping = false;
                this.dashboardUpdateService.ChatstartSubmitted = false;
              }
              else if (message.text == "YesCounsellorOnchatStill") {
                this.YesCounsollerOnchat(message.CounsollerId);
              }
              else if(message.text =="ClientOnchatStill")
              {
                this.sendMessageCustom('YesClientOnchatStill');
              }
              else if (this.currentUser.RoleId != 5 && message.text == 'Counsellor Connected' && this.isCounsellorConnected == false) {
                //Client section
                this.StatingMsg = `Your Counsellor, ${this.currentLiveChatAppts.CounsellorName ? this.currentLiveChatAppts.CounsellorName : ''}  has  joined `;
                this.isCounsellorConnected = true;
                this.Connectedcounsoller = true;
                this.dashboardUpdateService.ChatstartSubmitted = true;
                this.dashboardUpdateService.ACEAppointmentId = this.ACEAppointmentId;
                this.sendMessageCustom('Client Connected');
              }
              else if (this.currentUser.RoleId == 5 && message.text == 'Client Connected' && this.isClientConnected == false) {
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
                // this.sendMessageinstant('InstantChatRequest');
                this.isInstantChatMessageflase = 1;
                this.YesAliveCounsoller(message.CounsollerId)
              }
              else if (message.text == 'YesInstantChatRequest') {
                console.log("Receive YesInstantChatRequest " + new Date());
                this.isInstantChatMessage = 1;
                this.upcomingAppointmentsServiceService.CreateInstantChatAppt(this.currentUser.UserId, this.CounsollerId, this.QueueId)
                  .subscribe((response: any) => {
                    if (response) {
                      console.log(response.Result);
                      this.InstantChatAppt = response.Result;
                      this.InstantAceApptid = this.InstantChatAppt.ACEAppointmentId;
                      // this.router.navigate(['/dashboard/chatroom']);
                      this.sendMessageinstant("Join");
                      //  setTimeout(() => {
                      this.router.navigate([`/dashboard/chatroom/` + this.InstantChatAppt.ACEAppointmentId + ``]);
                      // }, 700);

                    }
                    if (message.text == 'NoInstantChatRequest') {
                      this.isInstantChatMessage = 2;
                    }

                  }, (err: HttpErrorResponse) => {
                    console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
                  });
              }
              if (message.text != "" && message.text != "YesAlive" && message.text != "Alive" && message.text != "InstantChatRequest" && message.text != "YesInstantChatRequest" && message.text != "Join" && message.text != "NoInstantChatRequest") {
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
    if (this.ACEAppointmentId != undefined) {
      this.dashboardUpdateService.ACEAppointmentId = this.ACEAppointmentId;
      this.CurrentAppointments(this.ACEAppointmentId);
    }


  }

  sendMessage() {
    if (this.message.text != "") {
      this.message.date = new Date;
      this.message.Message = this.message.text;
      this.message.Type = "Client";
      this.message.Name = this.currentLiveChatAppts.Username;
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
          if (this.currentLiveChatAppts.IsInstantChat != true) {
            //--------------------------------------------

            if (this.currentLiveChatAppts.StartDateDiffMins > 10) {
              this.Appoitmenttimertimestart = true;
            }
            if (this.currentUser.RoleId == 5) {
              this.StatingMsg = `Your Client, ${this.currentLiveChatAppts.Username ? this.currentLiveChatAppts.Username : ''} has not joined yet.`;
              this.sendMessageCustom('Counsellor Connected');
            }
            else {
              this.StatingMsg = `Your Counsellor, ${this.currentLiveChatAppts.CounsellorName ? this.currentLiveChatAppts.CounsellorName : ''} has not joined yet.`;
              this.sendMessageCustom('Client Connected');
            }
          }
          else {
            if (this.currentUser.RoleId == 5 && this.currentLiveChatAppts.UserId == this.currentUser.UserId) {
              this.StatingMsg = `Your Client, ${this.currentLiveChatAppts.Username ? this.currentLiveChatAppts.Username : ''}  has  joined `;
              //this.sendMessageCustom('Counsellor Connected');
            }
            else if (this.currentLiveChatAppts.UserId == this.currentUser.UserId) {
              this.StatingMsg = `Your Counsellor, ${this.currentLiveChatAppts.CounsellorName ? this.currentLiveChatAppts.CounsellorName : ''}  has  joined `;
              // this.sendMessageCustom('Client Connected');
              this.dashboardUpdateService.ChatstartSubmitted = true;
              this.Appoitmenttimeovertimeinterval = true;
              this.Connectedcounsoller = true;
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
    this.cliendidforcounsollercondtion = message.ClientId;
    if (this.ACEAppointmentId != undefined) {
      if (message.ACEAppointmentId == this.ACEAppointmentId) {
        this.isTrue = true;
      }
    }
    else {
      if (message.CounsollerId == message.CounsollerId && message.ClientId == this.currentUser.UserId) {
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
debugger;
    this.isLoad = true;
    this.buttonshowcheck();
  //  this.buttomtimest = true;
    this.GetcounsolllerInstantchatlist();
    setTimeout(() => {
      this.isLoad = false;
      this.isListView = false;
      //  console.log(this.Intchatradio)
      // alert(this.Intchatradio);
      if (this.Intchatradio == 2 && this.buttomtimest == true) {
        this.buttontimestmsg = true;
        this.isInstantChatMessageshow = 1;


        if (this.LiveCounseller.length == 0) {
          this.Nocounsoller = true;
        }
        else {
          this.upcomingAppointmentsServiceService.CreateQueue(this.currentUser.UserId)
            .subscribe((response: any) => {
              if (response) {
                this.QueueId = response.Result.QueueId;
                this.QuepostionFirst = true;
                this.GetpostionofQueue();
              }

            }, (err: HttpErrorResponse) => {
              console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
            });
        }

      }
      else if (this.Intchatradio == 1 && this.buttomtimest == true) {
        this.instantchatyes = true;
        this.buttontimestmsg = true;
        this.isInstantChatMessageshow = 2;
        this.upcomingAppointmentsServiceService.SendEmailForInstantchat(this.currentUser.UserId)
          .subscribe((response: any) => {
            if (response) {

              console.log(response.Result);
              this.InstantChatyes = response.Result;


            }
            else {


            }

          }, (err: HttpErrorResponse) => {
            console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
          });
      }
      else {
        this.isInstantChatMessageshow = 3;
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
    this.message.senderId = this.currentUser.UserId;
    this.message.CounsollerId = this.CounsollerId;
    this.message.InstantAceApptid = this.InstantAceApptid;
    this.message.ClientName = this.currentUser.FirstName+' '+this.currentUser.LastName;
    this.chatService.sendMessage(this.message);
    this.message = new ChatModel();

  }
  sendMessageinstantnow(msg, id) {
    this.message.text = msg;
    this.message.date = new Date;
    this.message.senderId = this.currentUser.UserId;
    this.message.CounsollerId = id;
    this.message.InstantAceApptid = this.InstantAceApptid;
    this.message.ClientName = this.currentUser.FirstName+' '+this.currentUser.LastName;
    this.chatService.sendMessage(this.message);
    this.message = new ChatModel();

  }
  buttonshowcheck() {
    debugger;
    this.upcomingAppointmentsServiceService.IsValidTimeForInstantChat()
      .subscribe((response: any) => {
        if (response) {
          console.log(response.Result);
          this.IsValidTimeForInstantChat = response.Result;
          if (this.IsValidTimeForInstantChat.UtcstartTime == 1) {
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
    this.router.navigate([`/dashboard/upcomingappointments`]);
    // this.StoretranscriptinACE(ACEAppointmentId);
    // this.upcomingAppointmentsServiceService.EndChatSession(this.currentUser.ACEClientId,ACEAppointmentId,this.Instntmessages)
    //   .subscribe((response: any) => {
    //     if (response) {


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
      // this.Appoitmenttimeover();
    }
    if (this.messages.length == 1) {
      this.CheckCounsollerIsOnlineonChatFlag = true;
      this.ChatstartSubmitted = true;
      this.Appoitmenttimeovertimeinterval = true;

      this.dashboardUpdateService.ACEAppointmentId = this.ACEAppointmentId;
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
    if (this.Appoitmenttimeovertimeinterval && this.dashboardUpdateService.intervaltimestop) {
      this.upcomingAppointmentsServiceService.Appoitmenttimeover(this.ACEAppointmentId)
        .subscribe((response: any) => {
          if (response) {
            if (response.Result.ChatTimeDiffMinsposite <= 0) {
              this.Connectedcounsoller = false;
              this.Chatappoitmettimeisover = true;
              this.Appoitmenttimeovertime = true;
              this.dashboardUpdateService.ChatstartSubmitted = false;
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
          this.custmessage.text = "Clienttyping";
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
        this.custmessage.text = "Clienttypingstop";
        this.custmessage.MsgType = "0";
        this.custmessage.senderId = this.currentUser.UserId;
        this.custmessage.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
        this.chatService.sendCustMessage(this.custmessage);
      }
    }, 500);


  }
  ClearTying() {
    let date1 = new Date().getTime();
    let date2 = new Date(this.LastReceiveTyping).getTime();

    let timeDiff = date1 - date2;  //milli sec
    let secDiff = timeDiff / 1000;

    if (secDiff > 30)
      this.Chatstarttyping = false;
  }
  Nextclickcontinue() {
    if (this.Intchatradio == 2 || this.Intchatradio == 1) {
      this.Nextbuttonshows = true;
    }

  }
  changeName() {
    this.commonServiceService.change(4);
  }
  ClientEndchat() {
    this.FirstTimeSent = true;
    this.LastSentTyping = new Date();
    this.custmessage.date = new Date;
    this.custmessage.text = "ClientEndchat";
    this.custmessage.MsgType = "0";
    this.custmessage.senderId = this.currentUser.UserId;
    this.custmessage.ACEAppointmentId = this.currentLiveChatAppts.ACEAppointmentId;
    this.chatService.sendCustMessage(this.custmessage);
    // this.message = new ChatModel();
  }

  makebooking(index) {
    this.dashboardUpdateService.intervaltimestop = false;
    this.currentMenuIndex = index;
    this.isLoad = true;
    this.dasboardHomeService.GetClientDashboard(this.currentUser.UserId, this.currentUser.ACEClientId)
      .subscribe((response: any) => {
        if (response) {
          this.ClientDashboardSessions = response.Result;
          if ((this.ClientDashboardSessions.AllowedAppts - this.ClientDashboardSessions.UsedAppts) == 0) {
            if (this.ChatstartSubmitted) {
              this.chatisstatrd = true;
              this.isLoad = false;
              this.chatcheckmaking = true;
            }
            else {

              this.isLoad = false;
              this.showquataEmptymsg = true;
              return;

            }
          }
          else {
            if (this.ChatstartSubmitted) {
              this.chatisstatrd = true;
              this.isLoad = false;
            }
            else {

              this.router.navigate([`/dashboard/booking`]);
              //this.isLoad = true;
              this.isLoad = false;
              // this.disableLoader();

            }
            // this.isLoad=false;
            //  this.router.navigate(["/dashboard/booking"]);

          }
        }
        else {
          this.isLoad = false;
          this.showquataEmptymsg = true;
          return;
        }

      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        this.isLoad = false;
      });
  }

  Appoitmenttistart() {
    if (this.Appoitmenttimertimestart && this.dashboardUpdateService.intervaltimestop) {
      this.upcomingAppointmentsServiceService.Appoitmenttistart(this.ACEAppointmentId)
        .subscribe((response: any) => {
          if (response) {
            if (response.Result.StartDateDiffMins == 10) {
              this.Appoitmenttimertimestart = false;
              window.location.reload();
              //  this.CurrentAppointments(this.ACEAppointmentId);
            }

          }
          else {


          }

        }, (err: HttpErrorResponse) => {
          console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
        });
    }
  }
  Yesmodelchatend() {
    this.isLoad = true;
    this.upcomingAppointmentsServiceService.EndChatSession(this.dashboardUpdateService.ACEAppointmentId, this.dashboardUpdateService.messages)
      .subscribe((response: any) => {
        if (response) {
          if (this.currentMenuIndex == 0) {
            if (this.chatcheckmaking) {
              this.chatisstatrd = false;
              this.dashboardUpdateService.ChatstartSubmitted = false
              this.showquataEmptymsg = true;
              this.router.navigate([`/dashboard/home`]);
              this.isLoad = false;
            }
            else {
              this.chatisstatrd = false;
              this.ChatstartSubmitted = false;
              this.dashboardUpdateService.ChatstartSubmitted = false
              this.router.navigate([`/dashboard/booking`]);
              this.isLoad = false;
            }

          }
          if (this.currentMenuIndex == 1) {
            this.chatisstatrd = false;
            this.ChatstartSubmitted = false;
            this.dashboardUpdateService.ChatstartSubmitted = false
            this.router.navigate([`/dashboard/chatroom`]);
            this.isLoad = false;
          }
          // this.disableLoader();
        }
        else {

          // this.disableLoader();
        }

      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });




  }
  Cancelmodelchatend() {
    this.chatisstatrd = false;
  }
  chatroomclick(index) {
    this.dashboardUpdateService.intervaltimestop = false;
    this.currentMenuIndex = index;
    if (this.ChatstartSubmitted) {
      this.chatisstatrd = true;
      this.isLoad = false;
    }
    else {

      this.router.navigate([`/dashboard/chatroom`]);
      //this.isLoad = true;
      this.isLoad = false;
      // this.disableLoader();

    }
  }
  closeModel() {
    this.showquataEmptymsg = false;
  }
  YesmodelchatendOk() {
    this.Chatisstatrdendedstop = false;
    this.Chatappoitmettimeisover = false;
    this.dashboardUpdateService.ChatstartSubmitted = false;
    this.CheckCounsollerIsOnlineonChatFlag=false;
    window.location.href='/dashboard/upcomingappointments';
  //  this.router.navigate([`/dashboard/upcomingappointments`]);
  }

  YesAliveCounsoller(Id) {
    if (this.LiveCounseller.indexOf(Id) == -1) {
      this.LiveCounseller.push(Id);
    }
  }
  Yesaliveresoponsecounsollers() {
    if (window.location.href.indexOf('dashboard/chatroom') != -1) {
      this.GetcounsolllerInstantchatlist();
      setTimeout(() => {
        this.Responseonsecounsoller();
      }, 15000);
    }
  }
  async Responseonsecounsoller() {
    let totalUsers = this.LiveCounseller.length;
    if (totalUsers == 0) {
      this.Nocounsoller = true;
    }
    else {
      this.Nocounsoller = false
      this.availCounslr = [];
      let currUser;
      for (let curr = 0; curr < totalUsers; curr++) {
        let temp = [];
        temp = (this.InstantChatCounsellers.filter(x => x.CounsellerId === this.LiveCounseller[curr])).filter(t => t.IsAvailable == 1);
        if (temp.length > 0) {
          this.availCounslr[curr] = temp[0].CounsellerId;
        }


      }


      let totalAvailCounlrs = this.availCounslr.length;
      if (totalAvailCounlrs > 0) {
        this.Estimatedtime = 2;
        for (let cuser = 0; cuser < totalAvailCounlrs; cuser++) {
          this.CounsollerId = this.availCounslr[cuser];
          this.sendMessageinstantnew('InstantChatRequest', this.CounsollerId);
          for (let sec = 0; sec < 20; sec++) {
            const isLiveValue = <number>await this.resolveAfter1Second(1);
            console.log();

            if (this.isInstantChatMessage == 1) {
              sec = 25;
            }
            else if (this.isInstantChatMessage == 2) {
              sec = 25;
            }
          }
          if (this.isInstantChatMessage == 1) {
            this.QuepostionFirst = false;
            return false;
          }
        }
      }
      else {
        this.Estimatedtime = this.Estimatetimeset;
      }

      let currTime = new Date().getTime();
      let date2 = new Date(this.WaitTimeStart).getTime();
      let diffMins = (currTime - date2) / 60000;
      if (diffMins < this.WaitMinutes) {
        this.Yesaliveresoponsecounsollers();
      }
      else {
        this.Instantchatsearchcounsoller = true;

        //if no in dialog
        //then exit loop, close that 30 second get position method call and ideally we should call aPI to update queue with one flag time ExitQueueOn = GEtUTC()
      }
    }
  }
  sendMessageinstantnew(msg: any, Rid: any) {
    this.message.text = msg;
    this.message.date = new Date;
    this.message.senderId = this.currentUser.UserId;
    this.message.CounsollerId = Rid;
    // this.message.InstantAceApptid = this.InstantAceApptid;
    this.message.ClientName = this.currentUser.FirstName+' '+this.currentUser.LastName;
    this.chatService.sendMessage(this.message);
    this.message = new ChatModel();

  }
  GetpostionofQueue() {
    // let interval = setInterval(() => {
    this.upcomingAppointmentsServiceService.PositionQueue(this.QueueId)
      .subscribe((response: any) => {
        if (response) {
          this.Estimatetimeset = response.Result.WaitTimeMins;

          if (response.Result.PositionQueue == 1 && this.Instantchatprocessstart == false) {
            // clearInterval(interval);
            this.Nocounsoller = false;
            this.Instantchatprocessstart = true;
            this.WaitTimeStart = new Date();
            this.Yesaliveresoponsecounsollers()
          }
          else if (response.Result.PositionQueue == 1 && this.Nocounsoller == true) {
            // clearInterval(interval);
            // this.Nocounsoller=false;
            this.Instantchatprocessstart = true;
            this.WaitTimeStart = new Date();
            this.Yesaliveresoponsecounsollers()
          }
          else if (response.Result.PositionQueue != 1) {
            this.Estimatedtime = this.Estimatetimeset;
          }

        }

      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
    //}, 30000);
  }
  GetcounsolllerInstantchatlist() {
    this.LiveCounseller = [];
    this.upcomingAppointmentsServiceService.GetInstantChatCounsellers()
      .subscribe((response: any) => {
        if (response) {
          // this.QuepostionFirst=false;
          this.InstantChatCounsellers = response.Result;
          if (this.InstantChatCounsellers.length == 0) {
            this.Nocounsoller = true;
          }
          else {
            this.InstantChatCounsellers.forEach(element => {
              this.CounsollerId = element.CounsellerId;
              this.sendMessageinstantnow("Alive", element.CounsellerId);
            });

            setTimeout(() => {
              let totalUsers = this.LiveCounseller.length
            }, 5000);
          }


        }

      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  YesInstantcchatendSearch() {
    this.Instantchatsearchcounsoller = false;
    this.WaitTimeStart = new Date();
    this.Yesaliveresoponsecounsollers();
  }
  NoInstantcchatend() {
    this.Instantchatsearchcounsoller = false;
    this.QuepostionFirst = false;
    window.location.href = '/dashboard/home';
  }
  // CheckCounsollerIsOnlineonChat() {
  //   if (this.CheckCounsollerIsOnlineonChatFlag && this.dashboardUpdateService.intervaltimestop) {
  //     let currentDate;
  //     let currMin = new Date().getMinutes();
  //     for (let i = 0; i < this.Instntmessages.length; i++) {
  //       if (this.Instntmessages[i].Type == "Counsellor ") {
  //         currentDate = this.Instntmessages[i].date;
  //       }
  //     }
  //     currentDate = new Date(currentDate).getMinutes();
  //     if ((currMin - currentDate) > 1) {
  //       this.CounsellerOnchat = [];
  //       this.sendMessageCustom('CounsellorOnchatStill')
  //       setTimeout(() => {
  //         let Checkcounsloer = this.CounsellerOnchat.length
  //         if (Checkcounsloer == 0) {
  //         this.Chatisdisconectnternet=true;
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
    this.Chatappoitmettimeisover = false;
    this.dashboardUpdateService.ChatstartSubmitted = false;
    this.CheckCounsollerIsOnlineonChatFlag=false;
    window.location.href='/dashboard/upcomingappointments';
  }
}
