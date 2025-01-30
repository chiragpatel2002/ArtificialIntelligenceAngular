import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent {
  
  constructor(private router : Router) {
  }

  login(){
    this.router.navigate(['dashboard']);
  }

  forgotPassword(){
    this.router.navigate(['forgot-password']);
  }
}
