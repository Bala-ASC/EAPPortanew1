import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorBookinghistoryComponent } from './counsellor-bookinghistory.component';

describe('CounsellorBookinghistoryComponent', () => {
  let component: CounsellorBookinghistoryComponent;
  let fixture: ComponentFixture<CounsellorBookinghistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorBookinghistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorBookinghistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
