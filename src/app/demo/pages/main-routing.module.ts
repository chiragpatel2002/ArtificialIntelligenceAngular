import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'groq-ai',
    loadChildren: () =>
      import('./groq-ai/groq-ai.module').then((m) => m.GroqAiModule)
  },
  {
    path: 'ollama-ai',
    loadChildren: () =>
      import('./ollama-ai/ollama-ai.module').then((m) => m.OllamaAiModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
