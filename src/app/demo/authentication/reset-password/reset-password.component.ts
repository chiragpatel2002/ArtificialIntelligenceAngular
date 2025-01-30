import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export default class ResetPasswordComponent {

}
