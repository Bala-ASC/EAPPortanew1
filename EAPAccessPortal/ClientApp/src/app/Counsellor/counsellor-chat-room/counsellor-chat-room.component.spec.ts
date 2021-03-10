import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorChatRoomComponent } from './counsellor-chat-room.component';

describe('CounsellorChatRoomComponent', () => {
  let component: CounsellorChatRoomComponent;
  let fixture: ComponentFixture<CounsellorChatRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorChatRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
