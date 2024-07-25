import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAnalyicsComponent } from './manager-analyics.component';

describe('ManagerAnalyicsComponent', () => {
  let component: ManagerAnalyicsComponent;
  let fixture: ComponentFixture<ManagerAnalyicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAnalyicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAnalyicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
