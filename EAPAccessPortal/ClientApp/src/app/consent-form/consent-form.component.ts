import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AppointmentConsents } from '../make-a-booking/appointment-consents';
import { BookingService } from '../booking.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Htmlconverter } from '../make-a-booking/htmlconverter';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-consent-form',
  templateUrl: './consent-form.component.html',
  styleUrls: ['./consent-form.component.css']
})
export class ConsentFormComponent implements OnInit {
  htmlconvert = new Htmlconverter();
  employerSubmitted: boolean = false;
  todaydate:any;
  UserId:any;
  currentDate:any;
  currentUser: any;
  FMName:string="";
  show=true;
  show1=false;
  isLoad=false;
  registerForm: FormGroup;
  appointmentConsents = new AppointmentConsents();
  private toasterService: ToasterService;
  AppointmentId: number = 0;
  private route: ActivatedRoute;
  public config: ToasterConfig =
    new ToasterConfig({
      timeout: 3000
    });
  constructor(private datePipe: DatePipe,toasterService: ToasterService,_route: ActivatedRoute,private formBuilder: FormBuilder,private _bookingService: BookingService,private router: Router) { 
    // this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.route = _route;
    this.toasterService = toasterService;
    this.UserId=this.route.snapshot.params["id1"];
    this.AppointmentId=this.route.snapshot.params["id2"];
    this.FMName=this.route.snapshot.params["id3"]

  } 

  ngOnInit() {
    //this.currentDate =  Date.now();
    this.registerForm = this.formBuilder.group({
      employerGroup: this.formBuilder.group({
        FullName: ['', Validators.required],
        Address: ['', Validators.required],
        Phone: ['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
        Signature: ['', Validators.required],
        EmergencyContactPerson: ['', Validators.required],
        CreatedDate: ['', Validators.required],
      }),


    });
    this.registerForm.controls.employerGroup.get('FullName').patchValue(this.FMName);
    //this.todaydate=formatDate(new Date(), 'yyyy-MM-dd');
    this.todaydate=this.datePipe.transform(new Date(), 'dd-MM-yyyy'); //whatever format you need. 
    
    this.registerForm.controls.employerGroup.patchValue({CreatedDate:this.todaydate});
  }
  get fe() { return (<FormGroup>this.registerForm.get('employerGroup')).controls; }
  get employerGroup() {

    return this.registerForm.get('employerGroup');
  }
  login() {
    this.employerSubmitted = true;
    if (this.registerForm.controls.employerGroup.invalid) {
      return;
    }
    else {
      this.isLoad=true;
      this.appointmentConsents.AppointmenId = this.AppointmentId;
      this.appointmentConsents.UserId = this.UserId;
      this.appointmentConsents.FullName = this.registerForm.controls.employerGroup.get('FullName').value;
      this.appointmentConsents.Address = this.registerForm.controls.employerGroup.get('Address').value;
      this.appointmentConsents.Phone = this.registerForm.controls.employerGroup.get('Phone').value;
      this.appointmentConsents.Signature = this.registerForm.controls.employerGroup.get('Signature').value;
      this.appointmentConsents.UserEnteredDate = this.registerForm.controls.employerGroup.get('CreatedDate').value;
      this.appointmentConsents.EmergencyContactPerson = this.registerForm.controls.employerGroup.get('EmergencyContactPerson').value;
      this. pdfbytesconvert();
      this.addconsentform();
      
    }
  }
  pdfbytesconvert()
  {

var y=`<div style="float: left;width: 92%; padding:0% 4% 3% 4%; color: #4D4D4F; font-size:16px; line-height:26px; font-family:Arial, sans-serif, Gotham, 'Helvetica Neue', Helvetica">

<div style="background: rgba(220, 221, 222, 0.30);border-radius: 10px; padding: 30px;float: left;width:calc(100% - 60px);">
    <p><strong>Welcome</strong> and thank you for contacting AccessEAP, the provider of your organisation's Employee Assistance Program (EAP).  It is our aim to provide you with a professional assessment, appropriate counselling, and where necessary, a referral to meet your needs.  Your counsellor will provide assistance and support for a personal or a work-related issue.  This could involve from one to six hours counselling, depending on the agreement we have with your employer.</p>
    <p>As part of providing a counselling service to you the counsellor will need to collect and record personal information from you that is relevant to your current situation.  This information will be a necessary part of the assessment and treatment that is conducted by your counsellor.  You may view and have a copy of the material recorded in your file upon request, subject to the exceptions in Australian Privacy Principle 12.</p>
    <p>Prior to your first counselling session we ask you to complete an Intake Questionnaire and at the end of your counselling we will invite you, via email, to complete an online evaluation of the service you have received.  You do not have to complete these forms, but we would like you to, because it helps us provide a good quality service.</p>
    
    <h4 style="font-size:18px;">CONFIDENTIALITY GUARANTEED</h4>

    <p>AccessEAP guarantees confidentiality of all sessions, unless written permission is given by you to (a) discuss information with another professional, family member, work colleague or employer or (b) provide a written report to another professional or agency. However, confidentiality may be overridden in circumstances where there is a current or prospective serious risk of injury, either physical or emotional, to any person including yourself, or if a court issues a subpoena. All information you provide on the Intake Questionnaire and the Evaluation Form are also confidential.  Only statistical data is reported back to Companies and Organisations, and never in a way that identifies individuals.</p>

    <h4 style="font-size:18px;">KEEPING APPOINTMENTS</h4>
    <p>It is important to give at least 24 hours notice if you are unable to keep an appointment so that another client may be able to use that time period.  If you do not give 24 hours notice or do not attend for a counseling session, this session is still included in the number allocated by your employer.  You will therefore forfeit this session.</p>        
    
    <form>
        <p><span style="width: 30px; display: inline-block;">I</span> <input type="text" value='${this.appointmentConsents.FullName.toUpperCase()}' style="width:100%; max-width: 340px;background: rgba(220, 221, 222, 0.40);border:0px;border-radius:10px;display: inline-block;height:40px;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;color: #495057;"> (Insert Name)</p>
        
        <p><span style="width: 30px; display: inline-block;">of,</span> <input type="text" value='${this.appointmentConsents.Address.toUpperCase()}' style="width:100%; max-width:495px;background: rgba(220, 221, 222, 0.40);border:0px;border-radius:10px;display: inline-block;height:40px;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;color: #495057;"> (Insert Address)</p>
        
        <p>have read and understood the above information.  I agree to these conditions for the counselling service provided by AccessEAP.</p>
        
        <p>An emergency contact person for me is:  <input type="text" value='${this.appointmentConsents.EmergencyContactPerson}' style="width:100%; max-width:340px; background: rgba(220, 221, 222, 0.40);border:0px;border-radius:10px;display: inline-block;height:40px;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;color: #495057;"></p> 
        
        <p>Phone: <input type="text" value='${this.appointmentConsents.Phone}' style="width:calc(100% - 90px); background: rgba(220, 221, 222, 0.40);border:0px;border-radius:10px;display: inline-block;height:40px;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;color: #495057;"></p>
        
        <p>Signature: <input type="text" value='${this.appointmentConsents.Signature}' style="width:calc(100% - 120px); background: rgba(220, 221, 222, 0.40);border:0px;border-radius:10px;display: inline-block;height:40px;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;color: #495057;"></p>
        
        <p>Date: <input type="text" value='${this.appointmentConsents.UserEnteredDate}' style="width:calc(100% - 80px); background: rgba(220, 221, 222, 0.40);border:0px;border-radius:10px;display: inline-block;height:40px;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;color: #495057;"></p>
        
        <p>Please note: If, after reading this page you are at all unsure of what is written, please discuss it with the counsellor.</p>
    </form>                         
</div>
</div>`
this.htmlconvert.html1 = y;

  }
  genaratepdf()
  {
    this._bookingService.Getpdf(this.htmlconvert)
    .subscribe(blob => {
      saveAs(blob, 'ConsentForm.pdf', {
        
      });
    });
  }
  addconsentform()
  {
    this.appointmentConsents.ConsentPdfFile=this.htmlconvert.html1;
    this._bookingService.addConsentFormEnc(this.appointmentConsents).subscribe((response: any) => {
      if (response.IsSuccess) {
        this.genaratepdf();
        //this.toasterService.pop('success', '', 'Appointment is Confirmed');
        this.show=false;
        this.show1=true;
        //this.router.navigate(['/login']);
        // alert('Appointment is submitted.');
      }
      else {
        //this.isConfirmed=false;
        //
        this.toasterService.pop('error', '', 'Something is went wrong please try later');
      }
      this.isLoad=false;
    }, (err: HttpErrorResponse) => {
      console.log(`'Problem with the sevice. Please try later :  ${err.message} `);
      this.isLoad=false;
    });
  }
  public matcher(event) {
    const allowedRegex = /[0-9]/g;

    if (!event.key.match(allowedRegex)) {
        event.preventDefault();
    }
}
}
