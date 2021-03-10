import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import {SignupUser} from './model/signupUser'
import { User } from './Counsellor/counsellor-my-profile/user';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  constructor(private http: HttpClient) { }

  
  CheckDomain(email: any) {
    return this.http.post<any>(`${environment.apiUrl}api/User/CheckDomain?email=`+email+``,"");
  }

  GetGroups(customerId: any) {
    return this.http.get<any>(`${environment.apiUrl}api/User/GetGroups?customerId=`+customerId+``);
  }

  GetDivisions(groupId: any) {
    return this.http.get<any>(`${environment.apiUrl}api/User/GetDivisions?groupId=`+groupId+``);
  }
  GetDepartments(divisionId: any) {
    return this.http.get<any>(`${environment.apiUrl}api/User/GetDepartments?divisionId=`+divisionId+``);
  }
  
  // SignupCounsellor(counsellor): Observable<any> {
  //   return this.http.post<any[]>(`${environment.apiUrl}api/User/counsellor`,counsellor);
  // }

  SignupCounsellor(counsellor: SignupUser) {
    return this.http.post<any>(`${environment.apiUrl}api/User/SignupCounsellor`, counsellor);
  }
  ConfirmCounsellor(cofirm: any) {
    return this.http.post<any>(`${environment.apiUrl}api/User/ConfirmCounsellor`, cofirm);
  }
  GetUserById(userId: number)
  {  
    return this.http.get<any>(`${environment.apiUrl}api/User/GetUserByEncryptedId?UserId=`+userId);   
  }
  UserLogin(authentication: any) {
    return this.http.post<any>(`${environment.apiUrl}api/User/UserLogin`, authentication);
  }
  ForgetPassword(object) {    
    return this.http.post<any>(`${environment.apiUrl}api/User/Forgotpassword`, object);
  } 
  updatePassword(forgotpassword)
  {
    return this.http.post<any>(`${environment.apiUrl}api/User/Updatepassword`,forgotpassword);
  } 
  checkemailduplication(email: any)
  {
    return this.http.post<any>(`${environment.apiUrl}api/User/CheckEmailDuplication?email=`+email+``,"");
  } 
  CheckDomainandclientserviceEnabled(DomainName: any) {
    return this.http.get<any>(`${environment.apiUrl}api/User/CheckDomainandClientService?DomainName=`+DomainName+``);
  }
  UpdateUserInfo(user: User) {
    return this.http.post<any>(`${environment.apiUrl}api/User/UpdateUserInfo`, user);
  }
  CheckUrlisExpiredOrNot(UserId,GUID) {
    return this.http.get<any>(`${environment.apiUrl}api/User/CheckUrlisExpireOrNot?UserId=` + UserId+'&GUID='+GUID);  
  }
  CheckUserIsActive(UserId) {
    return this.http.get<any>(`${environment.apiUrl}api/User/IsActiveUser?UserId=` + UserId);  
  }
}