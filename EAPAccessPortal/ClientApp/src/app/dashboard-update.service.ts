import { Injectable } from '@angular/core';
import { ChatModel } from './chat-room/chat.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardUpdateService {
  ChatstartSubmitted:boolean=false;
  ChatstartSubmittedcounsoller:boolean=false;
  Chatstarttyping:boolean=false;
  ACEAppointmentId: any;
  messages: ChatModel[] = [];
  intervaltimestop:boolean=false;
  intervaltimestopcounsoller:boolean=false;
  ChatstartSubmittedvideo: boolean = false;
  intervaltvideocal:boolean=false;
  DashtempIndex: number = 0;
  InstantchatPopupstop:boolean=false;
  constructor() { }

}
