import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalResetPasswordComponent } from './reset-password.component';

describe('PortalResetPasswordComponent', () => {
  let component: PortalResetPasswordComponent;
  let fixture: ComponentFixture<PortalResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortalResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
