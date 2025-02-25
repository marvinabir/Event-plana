import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faSearch, faHeart, faShoppingCart, faUserCircle, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { SearchService } from '../../../services/search.service';


@Component({
  selector: 'app-manager-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './manager-navbar.component.html',
  styleUrl: './manager-navbar.component.css'
})
export class ManagerNavbarComponent  {
  faUserCircle = faUserCircle;
  faUserPlus = faUserPlus;
  faUser = faUser;
  searchTerm: string = '';


  constructor(library: FaIconLibrary, private searchService: SearchService) {
    library.addIcons(faHome, faSearch, faHeart, faShoppingCart);
  }

  // handleSearch() {
  //   this.searchService.SearchTerm(this.searchTerm);
  // }
}