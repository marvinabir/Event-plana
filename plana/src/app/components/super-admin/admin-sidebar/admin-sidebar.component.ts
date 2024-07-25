import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartPie, faBox, faTags, faUsers, faUserCog, faStar, faQuestionCircle, faSignOutAlt, faClipboardList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  faChartPie = faChartPie;
  faBox = faBox;
  faTags = faTags;
  faUsers = faUsers;
  faUserCog = faUserCog;
  faStar = faStar;
  faQuestionCircle = faQuestionCircle;
  faSignOutAlt = faSignOutAlt;
  faClipboardList = faClipboardList;

}
