import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOversightComponent } from './event-oversight.component';

describe('EventOversightComponent', () => {
  let component: EventOversightComponent;
  let fixture: ComponentFixture<EventOversightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventOversightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventOversightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
