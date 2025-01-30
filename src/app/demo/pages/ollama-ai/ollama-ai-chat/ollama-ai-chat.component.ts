import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from 'src/app/common/api-url-helper';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-ollama-ai-chat',
  templateUrl: './ollama-ai-chat.component.html',
  styleUrl: './ollama-ai-chat.component.scss'
})
export class OllamaAiChatComponent {
  messages = [
    { username: 'assistant', text: 'Hello! How can i help you?' },
  ];
  displayMessages = [
    { username: 'assistant', text: 'Hello! How can i help you?' },
  ];
  models = ['llama3.2'];
  contentType = ['Send content to AI', 'Generate content from AI'];

  selectedModel: string = this.models[0];
  selectedContent: string = this.contentType[0];
  newMessage: string = '';
  
  constructor(private commonService: CommonService,
    private api: ApiUrlHelper,
    private toastr:ToastrService
  ) { }


  sendMessage() {
    var content = '.Please learn this content. I will provide question based on this content answer them from this content only.'


    if (this.newMessage.trim()) {
      if(this.selectedContent == 'Send content to AI'){
        content = "";
      }
      this.messages.push({ username: 'user', text: this.newMessage + content });
      this.displayMessages.push({ username: 'user', text: this.newMessage });
    }



    let model: any = []

    this.messages.forEach(element => {
      let obj = {
        modelName: this.selectedModel,
        messages: [
          {
            role: element.username,
            content: element.text
          }
        ]
      }
      model.push(obj)
    });


    let api = this.api.url.ollamaAI.chat;
    this.commonService.doPost(api, model).pipe().subscribe({
      next: (response) => {
        if (response.success) {
          debugger;
          const parsedResponse = JSON.parse(response.data);
          this.messages.push({ username: parsedResponse.message.role, text: parsedResponse.message.content });
          this.displayMessages.push({ username: parsedResponse.message.role, text: parsedResponse.message.content });
          this.newMessage = '';
        }
        else{
          this.toastr.error("No data available on this topic");
        }
      },
      error: (err) => {

      }
    });

    this.newMessage = '';
  }
}