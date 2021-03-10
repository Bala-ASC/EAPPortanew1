import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserIfoComponent } from './updateuser-ifo.component';

describe('UpdateuserIfoComponent', () => {
  let component: UpdateuserIfoComponent;
  let fixture: ComponentFixture<UpdateuserIfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateuserIfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateuserIfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
