import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaeckdomainComponent } from './chaeckdomain.component';

describe('ChaeckdomainComponent', () => {
  let component: ChaeckdomainComponent;
  let fixture: ComponentFixture<ChaeckdomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaeckdomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaeckdomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
