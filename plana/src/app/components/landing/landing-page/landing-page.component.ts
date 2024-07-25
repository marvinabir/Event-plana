import { Component, OnInit } from '@angular/core';
import { Event } from '../../../interfaces/Event';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  imports: [FormsModule, CommonModule,NavbarComponent]
})
export class LandingPageComponent implements OnInit {

  Events: Event[] = [];
  filteredEvents: Event[] = [];
  selectedCategoryId: number | null = null;

  
  ngOnInit() {
    
  }


  initSlider() {
    const wrapper = document.querySelector(".sliderWrapper") as HTMLElement;
    const menuItems = document.querySelectorAll(".menuItem");

    if (wrapper && menuItems.length) {
      menuItems.forEach((item, index) => {
        item.addEventListener("click", () => {
          wrapper.style.transform = `translateX(${-100 * index}vw)`;
        });
      });
    }
  }

  initPaymentModal() {
    const productButton = document.querySelector(".productButton") as HTMLElement;
    const payment = document.querySelector(".payment") as HTMLElement;
    const close = document.querySelector(".close") as HTMLElement;

    if (productButton && payment && close) {
      productButton.addEventListener("click", () => {
        payment.style.display = "flex";
      });
      close.addEventListener("click", () => {
        payment.style.display = "none";
      });
    }
  }
}