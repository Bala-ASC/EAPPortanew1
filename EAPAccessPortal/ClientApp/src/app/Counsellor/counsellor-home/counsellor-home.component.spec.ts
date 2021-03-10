import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorHomeComponent } from './counsellor-home.component';

describe('CounsellorHomeComponent', () => {
  let component: CounsellorHomeComponent;
  let fixture: ComponentFixture<CounsellorHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
