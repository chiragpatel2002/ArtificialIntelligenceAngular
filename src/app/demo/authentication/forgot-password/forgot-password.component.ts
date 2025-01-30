import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export default class ForgotPasswordComponent {
  constructor(private router : Router) {
  }

  verifyOTP(){
    this.router.navigate(['verify-otp'])
  }
}
