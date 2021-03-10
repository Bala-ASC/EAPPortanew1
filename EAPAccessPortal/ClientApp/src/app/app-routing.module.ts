import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { PortalLoginComponent } from './login/login.component';
import { PortalHomeComponent } from './home/home.component';
import { PortalSignupComponent } from './signup/signup.component';
import { PortalSignupAComponent } from './signup-a/signup-a.component';
import { PortalSignupBComponent } from './signup-b/signup-b.component';
import { PortalDashboardComponent } from './dashboard/dashboard.component';
import { PortalForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PortalResetPasswordComponent } from './reset-password/reset-password.component';
import { MakeABookingComponent } from './make-a-booking/make-a-booking.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UpcomingAppointmentsComponent } from './upcoming-appointments/upcoming-appointments.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { CounsellorHomeComponent } from './Counsellor/counsellor-home/counsellor-home.component';
import { CounsellorDashboardComponent } from './Counsellor/counsellor-dashboard/counsellor-dashboard.component';
import { CounsellorChatRoomComponent } from './Counsellor/counsellor-chat-room/counsellor-chat-room.component';
import { CounsellorBookinghistoryComponent } from './Counsellor/counsellor-bookinghistory/counsellor-bookinghistory.component';
import { CounsellorMyProfileComponent } from './Counsellor/counsellor-my-profile/counsellor-my-profile.component';
import { CounsellorUpcomingAppointmentsComponent } from './Counsellor/counsellor-upcoming-appointments/counsellor-upcoming-appointments.component';
import { VideoChatRoomComponent } from './video-chat-room/video-chat-room.component';
import { AuthGuard } from './guards/authguard';
import{ChangepasswordComponent}from './changepassword/changepassword.component';
import{ConsentFormComponent}from './consent-form/consent-form.component';
import{ChaeckdomainComponent} from './chaeckdomain/chaeckdomain.component';
import{UpdateuserIfoComponent}from './updateuser-ifo/updateuser-ifo.component';
import{DashboardChatRoomComponent}from './forchatroomredirect/dashboard-chat-room/dashboard-chat-room.component';
import{DirectChatRoomComponent}from './forchatroomredirect/direct-chat-room/direct-chat-room.component';
import{DirectVideoChatComponent}from './forchatroomredirect/direct-video-chat/direct-video-chat.component';
import{ActivationComponent}from './activation/activation.component';
//import{DashboardHomeComponent}from 
const routes: Routes = [
  { path: '', component: PortalHomeComponent, },
  { path: 'signup', component: PortalSignupComponent,},
  { path: 'login', component: PortalLoginComponent, },
  { path: 'forgot', component: PortalForgotPasswordComponent, },
  { path: 'signupA', component: PortalSignupAComponent, },
  { path: 'verified/:id', component: PortalSignupBComponent, },
  {path:'forgetpassword/:id1/:id2',component:ChangepasswordComponent},
  //{ path: 'dashboard', component: PortalDashboardComponent },
  { path: 'reset/:id', component: PortalResetPasswordComponent,  },
  {path:'consent-form/:id1/:id2/:id3',component:ConsentFormComponent,},
  {path:'checkdomain',component:ChaeckdomainComponent},
  {path:'updateuerinfo',component:UpdateuserIfoComponent},
  { path: 'activation/:id1/:id2', component: ActivationComponent },


  {
    path: 'dashboard', component: PortalDashboardComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: DashboardHomeComponent, canActivate: [AuthGuard] },
      { path: 'home', component: DashboardHomeComponent, canActivate: [AuthGuard] },
      { path: 'booking', component: MakeABookingComponent, canActivate: [AuthGuard] },
      { path: 'bookinghistory', component: BookingHistoryComponent, canActivate: [AuthGuard] },
      { path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard] },
      { path: 'upcomingappointments', component: UpcomingAppointmentsComponent, canActivate: [AuthGuard] },
      { path: 'chatroom', component: ChatRoomComponent, canActivate: [AuthGuard] },
      { path: 'chatroom/:id', component: ChatRoomComponent, canActivate: [AuthGuard] },
      { path: 'videochatroom', component: VideoChatRoomComponent, canActivate: [AuthGuard] },
      { path: 'videochatroom/:id', component: VideoChatRoomComponent, canActivate: [AuthGuard] },
       
    ]
  },
  {
    path: 'dashboard-counsellor', component: CounsellorDashboardComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: CounsellorHomeComponent, canActivate: [AuthGuard] },
      { path: 'counsellor-home', component: CounsellorHomeComponent, canActivate: [AuthGuard] },
      { path: 'counsellor-room', component: CounsellorChatRoomComponent, canActivate: [AuthGuard] },
      { path: 'counsellor-bookinghistory', component: CounsellorBookinghistoryComponent, canActivate: [AuthGuard] },
      { path: 'counsellor-myprofile', component: CounsellorMyProfileComponent, canActivate: [AuthGuard] },
      { path: 'counsellor-chatroom/:id', component: CounsellorChatRoomComponent, canActivate: [AuthGuard] },
      { path: 'counsellor-upcomingappointment', component: CounsellorUpcomingAppointmentsComponent, canActivate: [AuthGuard] },
      { path: 'videochatroom', component: VideoChatRoomComponent, canActivate: [AuthGuard] },
      { path: 'videochatroom/:id', component: VideoChatRoomComponent, canActivate: [AuthGuard] },
   
    ]
  },
  {
    path: 'dashboard-chat-room', component: DashboardChatRoomComponent,

    children: [
      { path: 'direct-chatroom/:id', component: DirectChatRoomComponent},
      { path: 'direct-videochatroom/:id', component: DirectVideoChatComponent},
   
    ]
  },

  { path: '', redirectTo: '/', pathMatch: 'full', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
