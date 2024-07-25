import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { faArrowRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotificationComponent } from '../../notification/notification.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, NotificationComponent,  ReactiveFormsModule, RouterLink,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  faArrowRight = faArrowRight;
  faArrowCircleLeft = faArrowCircleLeft;
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Invalid credentials';
      return;
    }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: response => {
        console.log("component",response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        const role = localStorage.getItem('role');

        console.log(role);
        if (role === 'SUPER_ADMIN') {
          this.router.navigate(['/su']);
        } else if (role === 'EVENT_MANAGER') {
          this.router.navigate(['/me']);
        } else {
          this.router.navigate(['/el']);
        }
      },
      error: error => {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }

  closeNotification() {
    this.errorMessage = null;
  }

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
