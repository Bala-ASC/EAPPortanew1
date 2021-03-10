import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { ToasterModule} from 'angular2-toaster/angular2-toaster';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { PortalHomeComponent } from './home/home.component';
import { PortalSignupComponent } from './signup/signup.component';
import { PortalSignupAComponent } from './signup-a/signup-a.component';
import { PortalSignupBComponent } from './signup-b/signup-b.component';
import { PortalDashboardComponent } from './dashboard/dashboard.component';
import { PortalForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PortalResetPasswordComponent } from './reset-password/reset-password.component';
import { PortalLoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MakeABookingComponent } from './make-a-booking/make-a-booking.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UpcomingAppointmentsComponent } from './upcoming-appointments/upcoming-appointments.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
import { CounsellorHomeComponent } from './Counsellor/counsellor-home/counsellor-home.component';
import { CounsellorChatRoomComponent } from './Counsellor/counsellor-chat-room/counsellor-chat-room.component';
import { CounsellorUpcomingAppointmentsComponent } from './Counsellor/counsellor-upcoming-appointments/counsellor-upcoming-appointments.component';
import { CounsellorMyProfileComponent } from './Counsellor/counsellor-my-profile/counsellor-my-profile.component';
import { CounsellorDashboardComponent } from './Counsellor/counsellor-dashboard/counsellor-dashboard.component';
import { CounsellorBookinghistoryComponent } from './Counsellor/counsellor-bookinghistory/counsellor-bookinghistory.component';
import { VideoChatRoomComponent } from './video-chat-room/video-chat-room.component';
import { ToasterModule} from 'angular2-toaster/angular2-toaster';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ConsentFormComponent } from './consent-form/consent-form.component';
import { ChaeckdomainComponent } from './chaeckdomain/chaeckdomain.component';
import { UpdateuserIfoComponent } from './updateuser-ifo/updateuser-ifo.component';
import { DashboardChatRoomComponent } from './forchatroomredirect/dashboard-chat-room/dashboard-chat-room.component';
import { DirectChatRoomComponent } from './forchatroomredirect/direct-chat-room/direct-chat-room.component';
import { DirectVideoChatComponent } from './forchatroomredirect/direct-video-chat/direct-video-chat.component';
import { DatePipe } from '@angular/common';
import { ActivationComponent } from './activation/activation.component';
import {OnlyNumberDirective} from './only-number.directive';
// const appRoutes: Routes = [
//   { path: 'home', component: DashboardHomeComponent },  
// ]
@NgModule({
  declarations: [
    AppComponent,    
    PortalHomeComponent,
    PortalSignupComponent,
    PortalSignupAComponent,
    PortalSignupBComponent,
    PortalDashboardComponent,
    PortalForgotPasswordComponent,
    PortalResetPasswordComponent,
    PortalLoginComponent,
    MakeABookingComponent,
    BookingHistoryComponent,
    MyProfileComponent,
    UpcomingAppointmentsComponent,
    DashboardHomeComponent,
    ChatRoomComponent,
    CounsellorHomeComponent,
    CounsellorChatRoomComponent,
    CounsellorUpcomingAppointmentsComponent,
    CounsellorMyProfileComponent,
    CounsellorDashboardComponent,
    CounsellorBookinghistoryComponent,
    VideoChatRoomComponent,
    ChangepasswordComponent,
    ConsentFormComponent,
    ChaeckdomainComponent,
    UpdateuserIfoComponent,
    DashboardChatRoomComponent,
    DirectChatRoomComponent,
    DirectVideoChatComponent,
    ActivationComponent,
    OnlyNumberDirective
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,  
    AppRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxEmojiPickerModule,
    ToasterModule.forRoot()
  ],

  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
