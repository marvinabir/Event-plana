import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnalyicsComponent } from './admin-analyics.component';

describe('AdminAnalyicsComponent', () => {
  let component: AdminAnalyicsComponent;
  let fixture: ComponentFixture<AdminAnalyicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAnalyicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnalyicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
