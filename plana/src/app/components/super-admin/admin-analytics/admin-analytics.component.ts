import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [],
  templateUrl: './admin-analytics.component.html',
  styleUrl: './admin-analytics.component.css'
})
export class AdminAnalyticsComponent implements OnInit {
  analyticsData: any = {}; 
  // This should be replaced with your actual analytics data type
  storage = {used: 1466, total: 2048, regular: 895, system: 379, shared: 192, free: 576};

  ngOnInit() {
    // Fetch analytics data from the server
    this.analyticsData = {
      totalEvents: 10,
      totalAttendees: 200,
      totalRevenue: 5000
      // Add more dummy data or fetch from a service
    };
  }
}
