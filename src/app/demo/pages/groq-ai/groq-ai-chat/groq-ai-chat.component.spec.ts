import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroqAiChatComponent } from './groq-ai-chat.component';

describe('GroqAiChatComponent', () => {
  let component: GroqAiChatComponent;
  let fixture: ComponentFixture<GroqAiChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroqAiChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroqAiChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
