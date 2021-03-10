import { Injectable,Input,Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  @Output() fire: EventEmitter<any> = new EventEmitter();
  @Output() profile: EventEmitter<any> = new EventEmitter();
  currentIndex:EventEmitter<any>=new EventEmitter();
  currentMenuIndex:number=0;
  private router: Router;
  constructor(_router: Router) {
    this.router = _router;
   }
  change(currentIndex) {
this.fire.emit(currentIndex);
   }

   getEmittedValue() {
     return this.fire;
   }
   changeprofile(profileName)
   {
this.profile.emit(profileName);
   }
   getEmittedProfileValue() {
    return this.profile;
  }
}
