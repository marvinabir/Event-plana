// import { Component, OnInit } from '@angular/core';
// import { Router, RouterOutlet ,ActivatedRoute, RouterModule } from '@angular/router';
// import { Event } from '../../../interfaces/Event';
// import { CommonModule } from '@angular/common';
// import { NavbarComponent } from "../../landing/navbar/navbar.component";

// @Component({
//   selector: 'app-event-detail',
//   standalone: true,
//   imports: [RouterOutlet, CommonModule, NavbarComponent,RouterModule],
//   templateUrl: './event-detail.component.html',
//   styleUrls: ['./event-detail.component.css']
// })
// export class EventDetailComponent implements OnInit {
//   event: Event | undefined;


//   constructor(private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       const eventId = +params.get('id')!;
//       if (eventId) {
//         this.loadEvent(eventId);
//       }
//     });
//   }

//   loadEvent(eventId: number): void {
//     const storedEvents = localStorage.getItem('events');
//     if (storedEvents) {
//       const events: Event[] = JSON.parse(storedEvents);
//       this.event = events.find(event => event.id === eventId);
//       if (!this.event) {
//         console.error('Event not found');
//       }
//     } else {
//       console.error('No events found in local storage');
//     }
//   }


//   bookEvent(): void {
//     if (this.event) {
//       const storedBookings = localStorage.getItem('bookings');
//       let bookings: Event[] = storedBookings ? JSON.parse(storedBookings) : [];
//       bookings.push(this.event);
//       localStorage.setItem('bookings', JSON.stringify(bookings));
//       console.log('Event booked successfully');
//     } else {
//       console.error('No event to book');
//     }
//   }
  
// }


// import { Component, Input, OnInit } from '@angular/core';
// import { TicketTypeService } from '../../../services/user/ticket-type.service';
// import { BookingService } from '../../../services/user/booking.service';
// import { TicketType } from '../../../interfaces/TicketType';
// import { Event } from '../../../interfaces/Event';
// import { CommonModule } from '@angular/common';
// import { FormGroup, FormsModule } from '@angular/forms';


// @Component({
//   selector: 'app-event-detail',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './event-detail.component.html',
//   styleUrls: ['./event-detail.component.css']
// })
// export class EventDetailComponent implements OnInit {
//   @Input() event!: Event;
//   ticketTypes: TicketType[] = [];
//   selectedTicketTypeId?: number;
//   bookingCreated: boolean = false;
//   showBookingForm: boolean = false;

//   constructor(
//     private bookingService: BookingService,
//     private ticketTypeService: TicketTypeService
//   ) {}

//   ngOnInit(): void {
//     if (this.event) {
//       this.ticketTypeService.getTicketTypesByEventId(this.event.id!).subscribe(
//         (ticketTypes) => {
//           this.ticketTypes = ticketTypes;
//         }
//       );
//     }
//   }

//   bookEvent(): void {
//     if (this.selectedTicketTypeId) {
//       const booking = {
//         userId: 1, // This should be replaced with the actual user ID
//         eventId: this.event.id,
//         ticketTypeId: this.selectedTicketTypeId,
//         status: 'CONFIRMED' as 'CONFIRMED'
//       };

//       this.bookingService.createBooking(booking).subscribe(
//         () => {
//           this.bookingCreated = true;
//         },
//         (error) => {
//           console.error('Error creating booking:', error);
//         }
//       );
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../../services/manager/event.service';
import { BookingService } from '../../../services/user/booking.service';
import { Event } from '../../../interfaces/Event';
import { TicketTypeService } from '../../../services/user/ticket-type.service';
import { TicketType } from '../../../interfaces/TicketType';
import { NavbarComponent } from '../../landing/navbar/navbar.component';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent,RouterLink],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  ticketTypes: TicketType[] = [];
  selectedTicketTypeId: number | null = null;
  showBookingForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private bookingService: BookingService,
    private ticketTypeService: TicketTypeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const eventId = +params['id'];
      this.loadEvent(eventId);
      this.loadTicketTypes(eventId);
    });
  }

  loadEvent(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe(event => {
      this.event = event;
    });
  }

  loadTicketTypes(eventId: number): void {
    this.ticketTypeService.getTicketTypesByEventId(eventId).subscribe(ticketTypes => {
      this.ticketTypes = ticketTypes;
    });
  }

  toggleBookingForm(): void {
    this.showBookingForm = !this.showBookingForm;
  }

  bookEvent(): void {
    const userId = localStorage.getItem('userId');
    if (this.event && this.selectedTicketTypeId !== null && userId) {
      const booking = {
        userId: Number(userId),
        eventId: this.event.id!,
        ticketTypeId: Number(this.selectedTicketTypeId), // Ensure ticketTypeId is a number
        status: 'CONFIRMED' as const
      };
      this.bookingService.createBooking(booking).subscribe(
        response => {
          console.log('Booking successful:', response);
          this.showSuccessMessage();
        },
        error => {
          console.error('Booking failed:', error);
          this.showErrorMessage();
        }
      );
    } else {
      console.error('Booking failed: Invalid user or event data');
      this.showErrorMessage('Invalid user or event data');
    }
  }

  showSuccessMessage() {
    alert('Booking successful!');
  }

  showErrorMessage(message?: string) {
    alert(message || 'Booking failed. Please try again.');
  }
}
