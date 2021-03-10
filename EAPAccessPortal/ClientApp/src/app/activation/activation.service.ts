import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivationService {

  constructor(private http: HttpClient) { }
  ActivateUser(UserId: string) {
    return this.http.get<any>(`${environment.adminUrl}api/MobileUser/ActivateUser?UserId=`+UserId+``);
  }
}
