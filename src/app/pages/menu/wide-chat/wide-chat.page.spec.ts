import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WideChatPage } from './wide-chat.page';

describe('WideChatPage', () => {
  let component: WideChatPage;
  let fixture: ComponentFixture<WideChatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WideChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
