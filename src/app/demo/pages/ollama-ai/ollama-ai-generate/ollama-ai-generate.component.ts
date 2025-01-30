import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from 'src/app/common/api-url-helper';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-ollama-ai-generate',
  templateUrl: './ollama-ai-generate.component.html',
  styleUrl: './ollama-ai-generate.component.scss'
})
export class OllamaAiGenerateComponent {
  constructor(private commonService: CommonService,
    private api: ApiUrlHelper,
    private toastr:ToastrService 
  ) { }

  models = ['llama3.2'];
  contentType = ['Send content to AI', 'Generate content from AI'];

  selectedModel: string = this.models[0];
  selectedContent: string = this.contentType[0];
  newMessage: string = '';
  displayMessages :any = []; 
  messages : any = [];

  sendMessage() {
    //this.sendRequest()
    this.sendAIMessage();
  }

  sendAIMessage(){

    if (this.newMessage.trim()) {
      if(this.selectedContent == 'Send content to AI'){
      }
      this.messages.push({ username: 'user', text: this.newMessage });
      this.displayMessages.push({ username: 'user', text: this.newMessage });
    }

    const request = {
      model: this.selectedModel,
      prompt: this.newMessage
    };

    let api = this.api.url.ollamaAI.generate2;
    this.commonService.doPost(api, request).pipe().subscribe({
      next: (response) => {
        if (response.success) {
          debugger;
          this.messages.push({ username: 'assistant', text: response.data });
          this.displayMessages.push({ username: 'assistant', text: response.data });
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

  async sendRequest() {
    debugger;
    const request = {
      model: this.selectedModel,
      prompt: this.newMessage
    };

    let api = this.api.url.ollamaAI.generate;

    // Send user message to display immediately
    this.displayMessages.push({ username: 'User', text: this.newMessage });

    try {
      this.commonService.postRequest(api, request).subscribe({
        next: (responseBody: string) => {
          this.handleStream(responseBody);
        },
        error: (error: any) => {
          console.error(`Error: ${error.message}`);
        },
        complete: () => {
          console.log("Stream processing completed.");
        }
      });
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }

  private chunk = '';
  private completeResponse = ''; 

  private handleStream(responseBody: string) {
    let lines = responseBody.split('\n');
    
    for (let line of lines) {
      if (line.trim() === '') continue;

      try {
        const parsedData = JSON.parse(line);
        this.completeResponse += parsedData.response;

        // When the AI is done, we start typing the response in the chat
        if (parsedData.done) {
          this.typeMessage(this.completeResponse);
          this.completeResponse = '';  // Reset after typing the full message
          this.newMessage = '';
        }
      } catch (error) {
        console.error("Error parsing JSON chunk:", error);
      }
    }
  }

  private typeMessage(text: string) {
    let messageIndex = this.displayMessages.length;
    let currentText = '';
    let i = 0;

    // Push an empty message initially, and update it character by character
    this.displayMessages.push({ username: 'AI', text: currentText });

    // Typing effect: Add one character at a time
    const intervalId = setInterval(() => {
      currentText += text[i];
      this.displayMessages[messageIndex].text = currentText;
      i++;

      // If we've typed the entire message, stop the interval
      if (i >= text.length) {
        clearInterval(intervalId);
      }
    }, 100); // Adjust this interval to control typing speed (ms between characters)
  }
}
