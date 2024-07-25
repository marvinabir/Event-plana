import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMonitoringComponent } from './system-monitoring.component';

describe('SystemMonitoringComponent', () => {
  let component: SystemMonitoringComponent;
  let fixture: ComponentFixture<SystemMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemMonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
