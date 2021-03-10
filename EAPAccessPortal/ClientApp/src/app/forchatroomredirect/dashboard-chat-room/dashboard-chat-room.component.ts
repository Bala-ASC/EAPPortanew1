import { Component, OnInit } from '@angular/core';
import { User } from '../../Counsellor/counsellor-my-profile/user';
import { CounsellorMyProfileService } from '../../Counsellor/counsellor-my-profile/counsellor-my-profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardUpdateService } from '../../dashboard-update.service';
import { Router, ActivatedRoute } from '@angular/router';
import{CommonServiceService} from '../../common-service.service';
@Component({
  selector: 'app-dashboard-chat-room',
  templateUrl: './dashboard-chat-room.component.html',
  styleUrls: ['./dashboard-chat-room.component.css']
})
export class DashboardChatRoomComponent implements OnInit {

  isLoad = true;
  pagename:string;
  loadComponent:boolean=false;
  user = new User();
  imgType: boolean = false;
  FileType: any;
  picture: any;
  fileToUpload: File;
  files: any;
  imgURL: string = '';
  noImage: boolean = true;
  private router: Router;
  private route: ActivatedRoute;
  currentMenuIndex = 0;
  ChatstartSubmitted: boolean = false;
  onMain:number;
  private counsellorMyProfileService: CounsellorMyProfileService;
  private commonServiceService:CommonServiceService;
  constructor(_counsellorMyProfileService: CounsellorMyProfileService,_commonServiceService:CommonServiceService,public dashboardUpdateService: DashboardUpdateService,_route: ActivatedRoute, _router: Router) {
    this.counsellorMyProfileService = _counsellorMyProfileService;
    this.commonServiceService=_commonServiceService;
    this.route = _route;
    this.router = _router;

  
  }

  ngOnInit() {
    this.loadScript();
    this.commonServiceService.getEmittedValue()
    .subscribe(item => this.currentMenuIndex=item);

  
  
//  if(this.router.url=='/dashboard/chatroom')
// this.currentMenuIndex=4;

    //here u neeed to check this.router.url, if url has booking history then u set proper index
    this.ChatstartSubmitted = this.dashboardUpdateService.ChatstartSubmitted;
    // this.user = JSON.parse(localStorage.getItem('UserDetails'));
    // this.user.ProfilePhoto = JSON.parse(localStorage.getItem('ProfilePhoto'));
    // this.commonServiceService.getEmittedProfileValue()
    // .subscribe(item => this.user.ProfilePhoto=item);
    // this.disableLoader();
    // this.imgURL = this.user.ProfilePhoto;
  }

  disableLoader() {
    setTimeout(() => {    //<<<---    using ()=> syntax
      this.isLoad = false;
    }, 3000);
  }

  onMenuClick(index) {
    this.currentMenuIndex = index;
    this.isLoad = true;
    this.disableLoader();// after few sec
  }
  selectPhoto(file: FileList) {
    this.picture = file.item(0).name;
    this.fileToUpload = file.item(0);
    const File = this.fileToUpload.name;
    //this.contentAreas.FileName = File.split('.')[0];
    this.files = File.split('.');
    this.user.FileType = this.files[this.files.length - 1];
    var regex = new RegExp("(jpg|png|jpeg)$");
    if (regex.test(this.user.FileType.toLowerCase())) {
      //this.imgType = false;
      //console.log('filetype is correct');
    }
    else {
      //this.imgType = true;
      alert("file type must be jpg,png or jpeg");
      return;
    }
    this.noImage = false;

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgURL = event.target.result;
      var image = new Image();

    };


    reader.readAsDataURL(this.fileToUpload);

    this.uploadphoto()
  }
  uploadphoto() {
    if (this.imgURL != '')
      this.user.Base64Data = this.imgURL.split(',')[1];
    this.counsellorMyProfileService.updatephoto(this.user)
      .subscribe((data: any) => {
        console.log(data);
        if (data.IsSuccess) {
          alert("updated");
          //this.toasterService.pop('success', 'Success Toaster', 'ContentArea Added Successfully');
          //this.ChangeView();
          //this.GetContentAreas();

        }
      }, (err: HttpErrorResponse) => {
        console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      });
  }
  loadMyChildComponent() {
    this.loadComponent = true;
  }
  public loadScript() {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = '../assets/js/custom.js';
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}