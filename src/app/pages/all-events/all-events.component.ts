import { Component, OnInit, Input } from '@angular/core';
import { GetEventService } from '../../core/services/All Event/get-event.service';
import { CommonModule } from '@angular/common';
import { AllEventdetails } from '../../core/components/Interface/all-eventdetails/all-eventdetails';

@Component({
  selector: 'app-all-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css'
})
export class AllEventsComponent implements OnInit {
  @Input() events: any[] = [];
  // events: AllEventdetails[] = [];

  constructor(private eventService: GetEventService) { }

  ngOnInit(): void {
    this.loadEvent();
  }
  
  loadEvent(){
    this.eventService.getEvents().subscribe({
      next : (res: any) => {
        this.events = res.results as AllEventdetails[];
        console.log('Event fetched successfully');
      },
      error: (error) => console.log('Error fetching Events:', error)
    });
  }
}
