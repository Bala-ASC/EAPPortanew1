import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalSignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: PortalSignupComponent;
  let fixture: ComponentFixture<PortalSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
