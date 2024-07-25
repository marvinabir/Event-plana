import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Event } from '../../../interfaces/Event';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../landing/navbar/navbar.component";
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { SearchService } from '../../../services/search.service';
import { EventService } from '../../../services/manager/event.service';


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent,MatPaginatorModule,RouterModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  [x: string]: any;
  events: Event[] = [];
  displayedEvents: Event[] = [];
  currentEventId: number | null = null;
  pageSize = 5;
  pageIndex = 0;


  constructor(private eventService: EventService, private router: Router) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
 

  
   ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
      this.displayedEvents = events.slice(0, this.pageSize);
    });
  }

  viewEvent(eventId: number): void {
    this.router.navigate(['/event', eventId]);
  }


  saveEvents() : void {
    localStorage.setItem('events', JSON.stringify(this.events));
    this.updateDisplayedEvents();
  }

  updateDisplayedEvents() : void {
    const startIndex = this.pageIndex * this.pageSize;
    this.displayedEvents = this.events.slice(startIndex, startIndex + this.pageSize);
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updateDisplayedEvents();
  }

  onPageSizeChange(pageSizeEvent: any) : void  {
    const value = pageSizeEvent?.target?.value;
    if (value) {
      this.pageSize = parseInt(value, 10); 
    }
  }

}



// ngOnInit(): void {
//   this.addSampleEvents();
//   this.loadEvents();
// }

// addSampleEvents(): void {
//   const sampleEvents: Event[] = [
//     {
//       id: 1,
//       title: 'Angular Workshop',
//       description: 'A comprehensive workshop on Angular.',
//       location: 'Online',
//       price: 50,
//       eventDate: '2024-08-01',
//       eventTime: '10:00 AM'
//     },
//     {
//       id: 2,
//       title: 'React Conference',
//       description: 'An exciting conference on React.js.',
//       location: 'San Francisco, CA',
//       price: 100,
//       eventDate: '2024-09-10',
//       eventTime: '09:00 AM'
//     }
//   ];

//   const storedEvents = localStorage.getItem('events');
//   if (!storedEvents) {
//     localStorage.setItem('events', JSON.stringify(sampleEvents));
//   }
// }
