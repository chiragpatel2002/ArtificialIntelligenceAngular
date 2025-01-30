import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlHelper {
  public url = {
    groqAI :{
      chat : "groq-ai/chat"
    },
    ollamaAI:{
      generate : "generate",
      generate2 : "ollama/generate",
      chat : "ollama/chat"
    }
  }
}