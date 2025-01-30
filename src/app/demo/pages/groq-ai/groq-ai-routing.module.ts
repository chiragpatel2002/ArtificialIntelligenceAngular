import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroqAiChatComponent } from './groq-ai-chat/groq-ai-chat.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chat',
        component: GroqAiChatComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroqAiRoutingModule { }
