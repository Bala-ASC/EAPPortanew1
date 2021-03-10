import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChatRoomComponent } from './dashboard-chat-room.component';

describe('DashboardChatRoomComponent', () => {
  let component: DashboardChatRoomComponent;
  let fixture: ComponentFixture<DashboardChatRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardChatRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
