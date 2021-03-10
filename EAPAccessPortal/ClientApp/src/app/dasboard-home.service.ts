import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DasboardHomeService {

  constructor(private http: HttpClient) {
  }
  CurrentMonthAppointments(UserId : any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/CurrentMonthAppointments?UserId=`+UserId+``)
  }
  GetClientDashboard(UserId : any,clientid:any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/GetClientDashboard?UserId=`+UserId+`&clientId=` + clientid +``);
  }
  ChangeAppointment(ACEAppointmentId : any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/ChangeAppointment?ACEAppointmentId=`+ACEAppointmentId+``)
  }
  CancelAppointment(data){
    return this.http.post<any>(`${environment.apiUrl}api/Ace/SendSMSForAppointmentCancel`,data);
  }
}
