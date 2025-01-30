import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OllamaAiChatComponent } from './ollama-ai-chat/ollama-ai-chat.component';
import { OllamaAiGenerateComponent } from './ollama-ai-generate/ollama-ai-generate.component';
import { OllamaDirectAiGenerateComponent } from './ollama-direct-ai-generate/ollama-direct-ai-generate.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chat',
        component: OllamaAiChatComponent
      },
      {
        path: 'generate',
        component: OllamaAiGenerateComponent
      },
      {
        path : 'direct/generate',
        component : OllamaDirectAiGenerateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OllamaAiRoutingModule { }
