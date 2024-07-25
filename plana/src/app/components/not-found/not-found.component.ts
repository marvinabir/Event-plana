import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../landing/navbar/navbar.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
