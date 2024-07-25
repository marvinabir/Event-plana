import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommunicationComponent } from './manage-communication.component';

describe('ManageCommunicationComponent', () => {
  let component: ManageCommunicationComponent;
  let fixture: ComponentFixture<ManageCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCommunicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
