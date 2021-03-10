import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import {SignupUser} from './model/signupUser'
import{AppointmentConsents}from './make-a-booking/appointment-consents';
import { Htmlconverter } from './make-a-booking/htmlconverter';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient) { }

  FindBookingSlots(obj: any,clientId,userId,type) {
    return this.http.post<any>(`${environment.apiUrl}api/Ace/FindBookingSlotsNew?Clientid=`+clientId+`&userId=`+userId+`&type=`+type+``,obj);
  }
  MakeReservation(obj: any,clientId) {
    return this.http.post<any>(`${environment.apiUrl}api/Ace/MakeReservation?Clientid=`+clientId+``,obj);
  }
  ConfirmAppointment(obj: any) {
    debugger;
    return this.http.post<any>(`${environment.apiUrl}api/Ace/ConfirmAppointment`,obj);
  }
  getcredential()
  {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/GetCredentials`);
  }
  addConsentFormEnc(appointmentConsents:AppointmentConsents)
  {
    return this.http.post<any>(`${environment.apiUrl}api/Ace/ConsentFormSubmitEnc`,appointmentConsents);
  }
  Getpdf(htmlconvert:Htmlconverter):Observable<Blob>{
    return this.http.post(`${environment.apiUrl}api/Ace/DownloadPdf`,htmlconvert,{responseType:'blob'});
  }
  addConsentForm(appointmentConsents:AppointmentConsents)
  {
    return this.http.post<any>(`${environment.apiUrl}api/Ace/ConsentFormSubmit`,appointmentConsents);
  }
  GetACEclientIdExist(UserId: number) {
    return this.http.get<any>(`${environment.apiUrl}api/User/GetACEclientIdExist?UserId=`+UserId+``);
  }
  DeleteReservation(reservationId: any) {
    return this.http.delete<any>(`${environment.apiUrl}api/Ace/DeleteReservation?reservationId=`+reservationId+``);
  }
  IsFemaleCounsellerFirstF2FMeeting(UserId : any, CounsellerIdACE : any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/IsFemaleCounsellerFirstF2FMeeting?UserId=`+ UserId +`&CounsellerIdACE=` + CounsellerIdACE +``);
  }
  GetClientDashboard(UserId : any,clientid:any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/GetClientDashboard?UserId=`+UserId+`&clientId=` + clientid +``);
  }
  GetIsConsentFormFilled(UserId) {
    return this.http.get<any>(`${environment.apiUrl}api/User/IsConsentFormFilled?UserId=`+UserId);
  }
  CreateAceFamilyMember(obj: any) {
    debugger;
    return this.http.post<any>(`${environment.apiUrl}api/Ace/CreateAceFamilyMember`,obj);
  }
}
