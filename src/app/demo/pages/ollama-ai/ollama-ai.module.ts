import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OllamaAiRoutingModule } from './ollama-ai-routing.module';
import { OllamaAiChatComponent } from './ollama-ai-chat/ollama-ai-chat.component';
import { FormsModule } from '@angular/forms';
import { OllamaAiGenerateComponent } from './ollama-ai-generate/ollama-ai-generate.component';
import { OllamaDirectAiGenerateComponent } from './ollama-direct-ai-generate/ollama-direct-ai-generate.component';


@NgModule({
  declarations: [OllamaAiChatComponent,OllamaAiGenerateComponent,OllamaDirectAiGenerateComponent],
  imports: [
    CommonModule,
    OllamaAiRoutingModule,
    FormsModule
  ]
})
export class OllamaAiModule { }
