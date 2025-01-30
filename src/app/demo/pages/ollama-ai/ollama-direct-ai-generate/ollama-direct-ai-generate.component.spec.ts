import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OllamaDirectAiGenerateComponent } from './ollama-direct-ai-generate.component';

describe('OllamaDirectAiGenerateComponent', () => {
  let component: OllamaDirectAiGenerateComponent;
  let fixture: ComponentFixture<OllamaDirectAiGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OllamaDirectAiGenerateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OllamaDirectAiGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
