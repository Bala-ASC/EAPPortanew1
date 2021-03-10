import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivationService } from './activation.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {
  private toasterService: ToasterService;
  private activationService: ActivationService;
  private router: Router;
  private route: ActivatedRoute;
  UserId: string;
  Message:string;
  constructor(_route: ActivatedRoute, _router: Router,_activationService: ActivationService,private titleService:Title) {
    this.route = _route;
    this.router = _router;
    this.activationService=_activationService;
    this.titleService.setTitle("EAP User Activation");
    this.UserId=this.route.snapshot.params["id1"];
    
   }

  ngOnInit() {
    this.activationService.ActivateUser(this.UserId)
    .subscribe((data: any) => {
      if (data.IsSuccess) {
        if(data.Message=="User successfully activated")
        {
       this.Message="User successfully activated";
        }
       else if(data.Message=='User already activated')
       {
       this.Message="User already activated";
       }
      }
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
    });
  }

}
