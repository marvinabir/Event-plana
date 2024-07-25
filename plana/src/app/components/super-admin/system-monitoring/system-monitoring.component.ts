import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-system-monitoring',
  standalone: true,
  imports: [AdminSidebarComponent],
  templateUrl: './system-monitoring.component.html',
  styleUrl: './system-monitoring.component.css'
})
export class SystemMonitoringComponent {

}
