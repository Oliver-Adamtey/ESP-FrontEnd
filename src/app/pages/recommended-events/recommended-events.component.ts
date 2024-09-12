import { Component, OnInit } from '@angular/core';
import { allEventdetails, upcomingEvents, ViewEventdetails } from '../../core/Interface/all-eventdetails/all-eventdetails';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GetEventService } from '@services/Attendee Service/get-event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '@notifications//notification.service';
import { CustomDatePipe } from '@component/custom-date.pipe';
import { CapitalizeFirstPipe } from "../../shared/capitalizeFirst";

@Component({
  selector: 'app-recommended-events',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CustomDatePipe,
    CapitalizeFirstPipe
],
  templateUrl: './recommended-events.component.html',
  styleUrl: './recommended-events.component.css'
})
export class RecommendedEventsComponent implements OnInit{

  upcomingEvents: upcomingEvents[] | undefined;
  isLoading: boolean = true;
  id: string | null = sessionStorage.getItem('userId');

  constructor(
    private eventService: GetEventService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.popularEvent();
  }

  popularEvent() {
    this.eventService.loadingPopularEvents().subscribe({
      next: (res) => {
        this.upcomingEvents = res;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
      }
    });
  }

}
