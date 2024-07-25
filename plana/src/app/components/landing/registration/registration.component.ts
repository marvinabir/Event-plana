import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service'; // Adjust the path as needed
import { User} from '../../../interfaces/User'; // Adjust the path as needed
import { Role } from '../../../interfaces/role.enum';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: Role.ATTENDEE, // Default role
    createdAt: new Date(),
    updatedAt: new Date()
  };
  notificationMessage: string | null = null;
  notificationType: 'success' | 'error' = 'success';

  Role = Role;
  constructor(private userService: UserService, private router: Router) {}

  onSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      this.userService.register(this.user).subscribe(
        response => {
          this.notificationType = 'success';
          this.notificationMessage = 'User Registered Successfully';
          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000); // Redirect after 3 seconds
        },
        error => {
          this.notificationType = 'error';
          this.notificationMessage = 'Error Registering User. Try Again';
        }
      );
    }
  }

  closeNotification() {
    this.notificationMessage = null;
  }
}
