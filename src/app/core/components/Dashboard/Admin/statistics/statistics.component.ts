import { Component, inject, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, registerables } from 'chart.js';
import { AdminService } from '@services/Admin/admin-dashboard/admin.service';
import { Analytics } from '@interface/Admin/admin-analytics';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  adminAnalytics = inject(AdminService)

  constructor() {
    Chart.register(...registerables);
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements:{
      line:{
        tension:0.5
      },
    },
    scales:{
      y:{
        beginAtZero: true,
        title:{
          display: true,
          text: "Active Attendees"
        }
      }
    },
    plugins:{
      legend:{display: true}
    }
  }

  public lineChartType:ChartType ='line';
  ngOnInit(): void {
    this.adminAnalytics.getAnalytics().subscribe({
      next:(data:Analytics) => {
        const attendeesData = Object.values(data.currentYearData.attendees);
        const organizersData = Object.values(data.currentYearData.organizers);
        const labels = Object.keys(data.currentYearData.attendees);
        
        
        this.lineChartData = {
          labels:labels,
          datasets: [
            {
              data:attendeesData,
              label:'attendees',
              borderColor:'rgba(230, 46, 5, 1)',
              backgroundColor:'rgba(230, 46, 5, 0.1)',
              fill:'origin'
            },

            {
              data:organizersData,
              label:'organizers',
              borderColor:'rgba(151, 24, 12, 1)',
              backgroundColor:'rgba(151, 24, 12, 0.1)',
              fill:'origin'
            }
          ]
        }
      }
    });
  }


   

}