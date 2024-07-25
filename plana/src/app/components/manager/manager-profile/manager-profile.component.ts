import { Component } from '@angular/core';
import { ManagerSidebarComponent } from "../manager-sidebar/manager-sidebar.component";
import { ManagerNavbarComponent } from '../manager-navbar/manager-navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserProfile, ProfileService } from '../../../services/user/profile.service';
import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { Router } from 'express';
import { ResetPasswordService } from '../../../services/user/reset-password.service';
import { NavbarComponent } from '../../landing/navbar/navbar.component';
import { AdminSidebarComponent } from '../../super-admin/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-manager-profile',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule,ReactiveFormsModule,RouterLink,RouterOutlet,NavbarComponent,AdminSidebarComponent,ManagerNavbarComponent,ManagerSidebarComponent],
  templateUrl: './manager-profile.component.html',
  styleUrl: './manager-profile.component.css'
})
export class ManagerProfileComponent {
  profileForm: FormGroup;
  resetPasswordForm: FormGroup;
  userProfile: UserProfile | null = null;
  userId: number;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private profileService: ProfileService,private router: Router,private resetPasswordService: ResetPasswordService,) {
    this.userId = Number(localStorage.getItem('userId')); // Retrieve user ID from localStorage
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.profileService.getUserProfile(this.userId).subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.profileForm.patchValue(profile);
      },
      error: (err) => console.error('Error fetching profile:', err)
    });
  }


 
// Profile Update Submission
onSubmitProfileUpdate(): void {
  if (this.profileForm.invalid) {
    return;
  }
  this.profileService.updateUserProfile(this.userId, this.profileForm.value).subscribe({
    next: (updatedProfile) => {
      this.userProfile = updatedProfile;
      console.log('Profile updated successfully');
    },
    error: (err) => console.error('Error updating profile:', err)
  });
}

// Password Reset Submission
onSubmitPasswordReset(): void {
  if (this.resetPasswordForm.invalid) {
    this.errorMessage = 'Invalid input';
    return;
  }
  const { email, newPassword } = this.resetPasswordForm.value;
  this.resetPasswordService.resetPassword(email, newPassword).subscribe({
    next: () => {
      this.successMessage = 'Password reset successfully';
      this.errorMessage = null;
      this.resetPasswordForm.reset();
      console.log('Password reset successfully');
    },
    error: (error) => {
      this.errorMessage = error.error.message;
      this.successMessage = null;
      console.error('Error resetting password:', error);
    }
  });
}

}
