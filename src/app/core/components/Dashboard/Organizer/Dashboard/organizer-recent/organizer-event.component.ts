import {  Component, OnInit, inject } from '@angular/core';
import { OrganizerEventsService } from '@services/Organizer/organizer-events/organizer-events.service';
import { Event, Recent } from '@interface/Organizer/org.recent';
import { CommonModule } from '@angular/common';
import { Data, Router, RouterLink } from '@angular/router';
import { GetUsersService } from '@services/Organizer/get-users/get-users.service';
import { EventObject, PageableResponse } from '@interface/create-event/organizer';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-organizer-event',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './organizer-event.component.html',
  styleUrl: './organizer-event.component.css',

  
})
export class OrganizerEventComponent implements OnInit  {
  events: Event[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  records: Array<EventObject> = [];

  private OrganizerRecent = inject(OrganizerEventsService)
  private getOrganizerEvents = inject(GetUsersService)
  ngOnInit(): void {
    this.getOrganizerEvents.getEventsByFiltering(this.currentPage,this.pageSize).subscribe({
      next: (response: PageableResponse) => {
        this.records = response.content
        
      },
    }

   )
  }
}
