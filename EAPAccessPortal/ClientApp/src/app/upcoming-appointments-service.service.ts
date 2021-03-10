import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpcomingAppointmentsServiceService {

  constructor(private http: HttpClient) { 
  }
  UpcomingAppointments(UserId : any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/UpcomingAppointments?UserId=`+UserId+``)
  }
  GetAppointmentDetails(ACEApptId : any, ApptId : any) {
    debugger;
    //return this.http.get<any>(`${environment.apiUrl}api/Ace/GetAppointmentDetails?ACEApptId=`+ACEApptId+``)
    return this.http.get<any>(`${environment.apiUrl}api/Ace/GetAppointmentDetails?ACEApptId=`+ ACEApptId +`&ApptId=` + ApptId +``);
  } 
  ChangeAppointment(ACEAppointmentId : any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/ChangeAppointment?ACEAppointmentId=`+ACEAppointmentId+``)
  }
  CancelAppointment(data){
    return this.http.post<any>(`${environment.apiUrl}api/Ace/SendSMSForAppointmentCancel`,data);
  }
  GetInstantChatCounsellers() {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/GetInstantChatCounsellers`)
  }
  CreateInstantChatAppt(Userid : any, Counsellerid : any,QueueId :any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/CreateInstantChatAppt?Userid=`+ Userid +`&Counsellerid=` + Counsellerid  +`&QueueId=` + QueueId +``);
  } 
  IsValidTimeForInstantChat() {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/IsValidTimeForInstantChat `)
  }
  SendEmailForInstantchat(Userid : any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/SendEmailForInstantchat?Userid=`+ Userid +``);
  }
  EndChatSession(ACEAppointmentId :any,Messages:any) {
    return this.http.post<any>(`${environment.apiUrl}api/Ace/EndChatSession?ACEAppointmentId=`+ ACEAppointmentId +``,Messages);
  }  
  EndChatSessionEnded(ACEAppointmentId :any,Messages:any) {
    return this.http.post<any>(`${environment.apiUrl}api/Ace/EndChatSessionEnded?ACEAppointmentId=`+ ACEAppointmentId +``,Messages);
  }  
 
  ChatStartedOn(ACEAppointmentId :any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/ChatStartedOn?ACEAppointmentId=`+ ACEAppointmentId +``);
  } 
  GetACEclientIdExist(UserId: number) {
    return this.http.get<any>(`${environment.apiUrl}api/User/GetACEclientIdExist?UserId=`+UserId+``);
  }  
  Appoitmenttimeover(ACEAppointmentId : any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/GetAppointmentsEndTimediff?ACEAppointmentId=`+ACEAppointmentId+``)
  }
  Appoitmenttistart(ACEAppointmentId : any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/GetAppointmentsTimediff?ACEAppointmentId=`+ACEAppointmentId+``)
  }  
  StoretranscriptinACE(ACEClientId :any,ACEAppointmentId :any,Messages:any) {
    return this.http.post<any>(`${environment.apiUrl}api/Ace/StoretranscriptinACE?ACEClientId=`+ ACEClientId +`&ACEAppointmentId=`+ ACEAppointmentId +``,Messages);
  }
  StoreInsattranscriptinACE(ACEClientId:any,StartDate:any,EndDate:any,Messages:any) {
    debugger;
    return this.http.post<any>(`${environment.apiUrl}api/Ace/StoreInsattranscriptinACE?ACEClientId=`+ACEClientId+`&StartDate=`+ StartDate +`&EndDate=`+ EndDate +``,Messages);
  }
  CreateQueue(UserId : any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/CreateQueue?UserId=`+UserId+``)
  } 
  PositionQueue(QueueId : any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/PositionQueue?QueueId=`+QueueId+``)
  }    
  GetACEclientId(ACEAppointmentId:any)
  {
    return this.http.get<any>(`${environment.apiUrl}api/User/GetACEclientId?ACEAppointmentId=`+ACEAppointmentId+``)
  } 
  EndChatSessionMsg(ACEAppointmentId :any) {
    debugger;
    return this.http.get<any>(`${environment.apiUrl}api/Ace/EndChatSessionMsg?ACEAppointmentId=`+ ACEAppointmentId +``);
  }       
}  
