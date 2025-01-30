import { Component } from '@angular/core';
import { ApiUrlHelper } from 'src/app/common/api-url-helper';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-ollama-direct-ai-generate',
  templateUrl: './ollama-direct-ai-generate.component.html',
  styleUrl: './ollama-direct-ai-generate.component.scss'
})
export class OllamaDirectAiGenerateComponent {
  
    constructor(private commonService: CommonService,
      private api: ApiUrlHelper
    ) { }
  
  
    generateResponse() {
      const request = { model: 'deepseek-v2:16b', prompt: "Hello" };
    
      this.commonService.getResponse(request).subscribe(
        async (responseBody: string) => {
          // Split the string into individual JSON objects (based on newlines)
          const responseParts = responseBody.split('\n').filter(line => line.trim() !== '');
    
          let finalResponse = '';
    
          // Parse each part and concatenate the 'response' field
          responseParts.forEach((part: string) => {
            try {
              const jsonPart = JSON.parse(part);
              finalResponse += jsonPart.response;  // Concatenate each 'response'
            } catch (error) {
              console.error('Error parsing JSON part:', error);
            }
          });
    
          console.log(finalResponse);  // Log the concatenated string
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    }
}
