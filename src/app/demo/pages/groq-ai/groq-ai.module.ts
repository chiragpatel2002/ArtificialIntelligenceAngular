import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroqAiRoutingModule } from './groq-ai-routing.module';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import CommonTableComponent from 'src/app/common-component/common-table/common-table.component';
import { GroqAiChatComponent } from './groq-ai-chat/groq-ai-chat.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [GroqAiChatComponent],
  imports: [
    CommonModule,
    GroqAiRoutingModule,
    CardComponent,
    CommonTableComponent,
    FormsModule
  ]
})
export class GroqAiModule { }
