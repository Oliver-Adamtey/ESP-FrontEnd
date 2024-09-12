import { Component, Input, OnInit } from '@angular/core';
import { OrganizerDashboardService } from '@services/Organizer/dashboard/organizer-dashboard.service';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-org-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './org-progress.component.html',
  styleUrl: './org-progress.component.css'
})
export class OrgProgressComponent implements OnInit {

  @Input() organizerId!: number;
  

  progressPercentage!:number;

  constructor(private organizerDashboardService: OrganizerDashboardService) {}

  ngOnInit():void {
    this.updateProgress();
  }

  updateProgress(): void {
    this.organizerDashboardService.getDailyTicketSalesPercentage(this.organizerId).subscribe({
      next: (percentage: number) => {
        this.progressPercentage = percentage;
      },
      error: (error) => {
        console.error('Error fetching percentage:', error);
        this.progressPercentage = 0;
      }
    });
  }
}


