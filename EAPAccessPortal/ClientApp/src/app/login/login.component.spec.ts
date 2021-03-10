import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalLoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: PortalLoginComponent;
  let fixture: ComponentFixture<PortalLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
