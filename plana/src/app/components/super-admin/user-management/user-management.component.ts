import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminUserService } from '../../../services/admin/admin-user.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../../interfaces/User';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule,AdminSidebarComponent,RouterLink,ReactiveFormsModule,HttpClientModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  

  constructor(private adminUserService: AdminUserService) {}

  ngOnInit(): void {
    this.adminUserService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
      this.totalPages = Math.ceil(this.users.length / this.pageSize);
      this.updatePaginatedUsers();
    });
  }

  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }
  

  deleteUser(id: number): void {
    this.adminUserService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }
  
}

 
// formVisible: boolean = false;
//  toggleForm(): void {
//     this.formVisible = !this.formVisible;
//     this['eventForm'].reset();
//   }