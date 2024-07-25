import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';
import { ManagerSidebarComponent } from "../manager-sidebar/manager-sidebar.component";
import { ManagerNavbarComponent } from '../manager-navbar/manager-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from '../../../services/manager/event.service';
import { Event } from '../../../interfaces/Event';




@Component({
  selector: 'app-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatPaginatorModule, ManagerSidebarComponent, ManagerNavbarComponent]
})
export class ManageEventComponent implements OnInit {
  events: Event[] = [];
  displayedEvents: Event[] = [];
  eventForm: FormGroup;
  formVisible = false;
  isEditing = false;
  selectedEvent: Event | null = null;
  pageSize = 10;

  constructor(private eventService: EventService, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(1)]],
      location: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventTime: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
      this.displayedEvents = events.slice(0, this.pageSize);
    });
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible;
    if (!this.formVisible) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.eventForm.reset();
    this.isEditing = false;
    this.selectedEvent = null;
  }

  editEvent(event: Event): void {
    this.selectedEvent = event;
  
    // Parse date and time from the ISO string
    const eventDate = new Date(event.date).toISOString().split('T')[0];
    const eventTime = new Date(event.time).toISOString().substring(11, 16);
  
    this.eventForm.patchValue({
      title: event.title,
      description: event.description,
      price: event.price,
      location: event.location,
      eventDate: eventDate,
      eventTime: eventTime
    });
  
    this.isEditing = true;
    this.formVisible = true;
  }
  

  addOrUpdateEvent(): void {
    if (this.eventForm.invalid) {
      return;
    }
  
    const date = this.eventForm.value.eventDate;
    const time = this.eventForm.value.eventTime;
  
    // Combine date and time into an ISO string
    const dateTimeISO = new Date(`${date}T${time}:00`).toISOString();
  
    const event = {
      ...this.eventForm.value,
      date: dateTimeISO,
      time: dateTimeISO // Use the same ISO string for both date and time
    };
    console.log(event);
  

    const userId = localStorage.getItem('userId');
  if (!userId) {
    console.error('User ID not found in local storage');
    return;
  }

  const eventManager = { ...event, managerId: parseInt(userId, 10) };

  console.log(eventManager);


    if (this.isEditing && this.selectedEvent) {
      this.eventService.updateEvent(this.selectedEvent.id!, event).subscribe(() => {
        this.loadEvents();
        this.toggleForm();
      });
    } else {
      this.eventService.createEvent(event).subscribe(response => {
        console.log("response", response);
        this.events.push(response);
        this.loadEvents();
        this.toggleForm();
      });
    }
  }
  
  deleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.loadEvents();
    });
  }

  handlePageEvent(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    this.displayedEvents = this.events.slice(startIndex, startIndex + event.pageSize);
  }
}








