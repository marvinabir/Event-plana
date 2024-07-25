// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router, RouterModule, RouterOutlet } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ResetPasswordService } from '../../../services/user/reset-password.service';

// @Component({
//   selector: 'app-reset-password',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterModule,RouterOutlet],
//   templateUrl: './reset-password.component.html',
//   styleUrls: ['./reset-password.component.css']
// })
// export class ResetPasswordComponent {
//   resetPasswordForm: FormGroup;
//   errorMessage: string | null = null;
//   successMessage: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private resetPasswordService: ResetPasswordService,
//     private router: Router
//   ) {
//     this.resetPasswordForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       newPassword: ['', [Validators.required, Validators.minLength(8)]],
//     });
//   }

//   onSubmit() {
//     if (this.resetPasswordForm.invalid) {
//       this.errorMessage = 'Invalid input';
//       return;
//     }
//     const { email, newPassword } = this.resetPasswordForm.value;
//     this.resetPasswordService.resetPassword(email, newPassword).subscribe({
//       next: () => {
//         this.successMessage = 'Password reset successfully';
//         this.errorMessage = null;
//         this.resetPasswordForm.reset();
//       },
//       error: (error) => {
//         this.errorMessage = error.error.message;
//         this.successMessage = null;
//       }
//     });
//   }
// }

