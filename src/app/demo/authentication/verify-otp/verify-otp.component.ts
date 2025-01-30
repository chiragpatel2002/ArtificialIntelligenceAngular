import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.scss'
})
export default class VerifyOtpComponent {

  constructor(private router : Router) {
  }

  resetPassword(){
    this.router.navigate(['reset-password']);
  }
}
