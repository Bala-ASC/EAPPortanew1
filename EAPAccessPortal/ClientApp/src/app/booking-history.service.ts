import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingHistoryService {

  constructor(private http: HttpClient) { 
  }
  BookingHistory(UserId : any) {
    return this.http.get<any>(`${environment.apiUrl}api/Ace/BookingHistory?UserId=`+UserId+``)
  }  
}
