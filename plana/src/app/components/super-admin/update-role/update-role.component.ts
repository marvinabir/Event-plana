import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Role } from '../../../interfaces/role.enum';
import { AdminUserService } from '../../../services/admin/admin-user.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';


@Component({
  selector: 'app-update-role',
  standalone: true,
  imports: [CommonModule, FormsModule,AdminSidebarComponent,RouterLink,ReactiveFormsModule,HttpClientModule],
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent {
  updateRoleForm: FormGroup;
  errorMessage: string | null = null;

  roles = Object.values(Role);

  constructor(
    private fb: FormBuilder,
    private adminUserService: AdminUserService,
    private router: Router
  ) {
    this.updateRoleForm = this.fb.group({
      userId: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.updateRoleForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const { userId, role } = this.updateRoleForm.value;
    this.adminUserService.updateUserRole(userId, role).subscribe({
      next: (user) => {
        this.router.navigate(['/user-details', user.id]);
      },
      error: (err) => {
        this.errorMessage = 'Failed to update role. Please try again.';
        console.error('Error updating role:', err);
      }
    });
  }
}
