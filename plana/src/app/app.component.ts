import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManagerNavbarComponent } from "./components/manager/manager-navbar/manager-navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ManagerNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'plana';
}
