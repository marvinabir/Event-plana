import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/user/booking.service';
import { Booking } from '../../../interfaces/Booking';
import { Event } from '../../../interfaces/Event';
import { TicketType } from '../../../interfaces/TicketType';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { EventService } from '../../../services/manager/event.service';
import { TicketTypeService } from '../../../services/user/ticket-type.service';


@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  events: { [key: number]: Event } = {};
  ticketTypes: { [key: number]: TicketType } = {};
  
  constructor(
    private bookingService: BookingService,
    private eventService: EventService,
    private ticketTypeService: TicketTypeService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.getBookings();
  }
  
  getBookings(): void {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage
    if (userId) {
      this.bookingService.getBookingsByUserId(Number(userId)).subscribe({
        next: (bookings) => {
          this.bookings = bookings;
          this.fetchAdditionalDetails();
        },
        error: (err) => console.error('Error fetching bookings:', err)
      });
    } else {
      console.error('No user ID found in localStorage');
    }
  }

  fetchAdditionalDetails(): void {
    this.bookings.forEach(booking => {
      if (!this.events[booking.eventId]) {
        this.eventService.getEventById(booking.eventId).subscribe({
          next: (event) => this.events[booking.eventId] = event,
          error: (err) => console.error('Error fetching event:', err)
        });
      }
      if (!this.ticketTypes[booking.ticketTypeId]) {
        this.ticketTypeService.getTicketTypeById(booking.ticketTypeId).subscribe({
          next: (ticketType) => this.ticketTypes[booking.ticketTypeId] = ticketType,
          error: (err:any) => console.error('Error fetching ticket type:', err)
        });
      }
    });
  }
}




// @Component({
//   selector: 'app-my-bookings',
//   standalone: true,
//   imports: [CommonModule,RouterModule,RouterOutlet],
//   templateUrl: './my-bookings.component.html',
//   styleUrl: './my-bookings.component.css'
// })

// export class MyBookingsComponent implements OnInit {
//   bookings: Booking[] = [];
//   event: Event | null = null;
  
//   constructor(private bookingService: BookingService, private router: Router) {}
  
//   ngOnInit(): void {
//     this.getBookings();
//   }
  
//   getBookings(): void {
//     const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage
//     if (userId) {
//       this.bookingService.getBookingsByUserId(Number(userId)).subscribe({
//         next: (bookings) => this.bookings = bookings,
//         error: (err) => console.error('Error fetching bookings:', err)
//       });
//     } else {
//       console.error('No user ID found in localStorage');
//     }
//   }
// }
