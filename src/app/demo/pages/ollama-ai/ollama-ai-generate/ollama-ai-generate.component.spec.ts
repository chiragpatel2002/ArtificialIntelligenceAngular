import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OllamaAiGenerateComponent } from './ollama-ai-generate.component';

describe('OllamaAiGenerateComponent', () => {
  let component: OllamaAiGenerateComponent;
  let fixture: ComponentFixture<OllamaAiGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OllamaAiGenerateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OllamaAiGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
