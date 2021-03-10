import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorUpcomingAppointmentsComponent } from './counsellor-upcoming-appointments.component';

describe('CounsellorUpcomingAppointmentsComponent', () => {
  let component: CounsellorUpcomingAppointmentsComponent;
  let fixture: ComponentFixture<CounsellorUpcomingAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorUpcomingAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorUpcomingAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
