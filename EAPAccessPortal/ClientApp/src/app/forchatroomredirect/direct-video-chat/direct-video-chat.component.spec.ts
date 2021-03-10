import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectVideoChatComponent } from './direct-video-chat.component';

describe('DirectVideoChatComponent', () => {
  let component: DirectVideoChatComponent;
  let fixture: ComponentFixture<DirectVideoChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectVideoChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectVideoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
