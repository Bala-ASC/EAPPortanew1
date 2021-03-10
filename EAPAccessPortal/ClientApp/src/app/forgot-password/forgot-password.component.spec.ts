import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalForgotPasswordComponent} from './forgot-password.component';

describe('PortalForgotPasswordComponent', () => {
  let component: PortalForgotPasswordComponent;
  let fixture: ComponentFixture<PortalForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortalForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
