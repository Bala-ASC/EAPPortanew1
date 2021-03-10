import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DirectChatRoomService {

  private url = 'https://eapnodeserver.azurewebsites.net/';
  //private url = 'http://localhost:3000/';
  private socket;
  constructor() {
      this.socket = io(this.url);

  }
  public sendCustMessage(custmessage) {
      this.socket.emit('new-message', custmessage);
  }
  public sendMessage(message) {
      this.socket.emit('new-message', message);
  }
  public getMessages = () => {
      return Observable.create((observer) => {
          //debugger;
          this.socket.on('new-message', (message) => {
           //   debugger;
              observer.next(message);
          });
      });
  }
  SetLoginClient(data) {
   this.socket.emit('login', data);
  }
  GetAllClients() {
      return Observable.create((observer) => {
         // debugger;
          this.socket.on('login', (message) => {
             // debugger;
              observer.next(message);
          });
      });
   }

}
