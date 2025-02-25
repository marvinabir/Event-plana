import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartPie, faBox, faTags, faUsers, faUserCog, faStar, faQuestionCircle, faSignOutAlt, faClipboardList } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-manager-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './manager-sidebar.component.html',
  styleUrl: './manager-sidebar.component.css'
})
export class ManagerSidebarComponent {
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
