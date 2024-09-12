import {  Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartData, ChartEvent, ChartType} from 'chart.js'
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { OrganizerDashboardService } from '@services/Organizer/dashboard/organizer-dashboard.service';
import { Data, Organizer } from '@interface/Admin/Organizer-dashboard/Organizer-dashboard';
import { organizerConstant } from '../dashboard/organizer-constant';


@Component({
  selector: 'app-organizer-statastics',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './organizer-statastics.component.html',
  styleUrl: './organizer-statastics.component.css',

  
})
export class OrganizerStatasticsComponent implements OnInit {

  public OrganizerDashboard = inject(OrganizerDashboardService)
  constant = organizerConstant
  
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:ChartData<'doughnut'> = {
    labels:this.doughnutChartLabels,
    datasets:[{data:[], backgroundColor:['#FF9C66', '#FFD6AE']}]
  }

  public doughnutChartType: ChartType = 'doughnut';

  userId = sessionStorage.getItem('userId') || '';

  ticketsSold:number = 0;
  ticketsLeft:number = 0;

  ngOnInit(): void {
    this.loadWeeklyData()
  }

  loadWeeklyData(): void {
    this.OrganizerDashboard.getOrganizerData(+this.userId)
     .subscribe((data: Organizer) => {
        this.updateChart(data.data.bestSellingDataWeekly.ticketsSoldThisWeek, data.data.bestSellingDataWeekly.ticketsLeft)
      })
  }
  loadMonthlyData(): void {
    this.OrganizerDashboard.getOrganizerData(+this.userId)
     .subscribe((data: Organizer) => {
        this.updateChart(data.data.bestSellingDataMonthly.ticketsSoldThisMonth, data.data.bestSellingDataMonthly.ticketsLeft)
      })
  }
  loadDailyData(): void {
    this.OrganizerDashboard.getOrganizerData(+this.userId)
     .subscribe((data: Organizer) => {
        this.updateChart(data.data.bestSellingDataDaily.ticketsSoldToday, data.data.bestSellingDataDaily.ticketsLeft)
      })
  }

  updateChart(sold:number, left:number) {
    this.ticketsSold = sold;
    this.ticketsLeft = left;
    this.doughnutChartData = {
      labels:this.doughnutChartLabels,
      datasets:[{data:[sold, left],backgroundColor:['#FFD6AE','#FF9C66'] },],
      
    }
  }
  

  onTapClick(tab:string) {
    if(tab === 'weekly') {
      this.loadWeeklyData();
    } else if(tab === 'monthly') {
      this.loadMonthlyData();
    } else if(tab === 'daily') {
      this.loadDailyData();
    }
  }

  public chartClicked({ event, active }: { event: ChartEvent; active: object[] }): void {
  }

  public chartHovered({ event, active }: { event: ChartEvent; active: object[] }): void {
  }
 
}
