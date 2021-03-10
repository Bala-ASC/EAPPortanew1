import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import{User}from '../counsellor-my-profile/user';
@Injectable({
  providedIn: 'root'
})
export class CounsellorMyProfileService {

  constructor(private http: HttpClient) { 


  }
  GetUserDetailById(Id: number) {
    return this.http.get<any>(`${environment.apiUrl}api/User/GetUserById?UserId=` + Id);
  }
  UpdateProfile(User:User) {
    return this.http.post<any>(`${environment.apiUrl}api/User/updateprofile`, User);
  }
  updatephoto(User:User){
   return this.http.post<any>(`${environment.apiUrl}api/User/updatephoto`, User);
  }
  updateIsLive(UserId,IsLive) {
    return this.http.get<any>(`${environment.apiUrl}api/User/UpdateUserIsLive?UserId=` + UserId+'&IsLive='+IsLive);
  }
}
