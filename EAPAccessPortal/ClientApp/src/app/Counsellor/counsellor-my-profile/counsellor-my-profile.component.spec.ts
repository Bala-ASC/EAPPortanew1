import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorMyProfileComponent } from './counsellor-my-profile.component';

describe('CounsellorMyProfileComponent', () => {
  let component: CounsellorMyProfileComponent;
  let fixture: ComponentFixture<CounsellorMyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorMyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
