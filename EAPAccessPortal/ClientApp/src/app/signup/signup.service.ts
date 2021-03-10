import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
export class SignupService {
    private subject = new Subject<any>();        
    constructor() {
    }
    // CheckDomain(email: any) {
    //     return this.http.post<any>(`${environment.apiUrl}api/User/PostUser?email=`+email+``,"");
    // }
    // setEmail(email: any) {
    //     this.subject.next({data: email });
    // }

    // getEmail(): Observable<any> {
    //     return this.subject.asObservable();
    // }

}