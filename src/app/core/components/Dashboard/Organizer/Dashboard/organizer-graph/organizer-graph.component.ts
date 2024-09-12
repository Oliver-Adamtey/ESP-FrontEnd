import { Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import { Data, MonthlyRevenueData, Organizer } from '@interface/Admin/Organizer-dashboard/Organizer-dashboard';
import { OrganizerDashboardService } from '@services/Organizer/dashboard/organizer-dashboard.service';
import { BehaviorSubject } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartEvent } from 'chart.js';


@Component({
  selector: 'app-organizer-graph',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './organizer-graph.component.html',
  styleUrl: './organizer-graph.component.css'
})
export class OrganizerGraphComponent implements OnInit {
  
  private organizerData = inject(OrganizerDashboardService);

 
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData:ChartConfiguration['data'] = {
    datasets:[],
    labels:[]
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements:{
      line:{
        tension:0.5,
      },
    },
    scales:{
      y:{
        position:'left'
      },
    },
    plugins: {
      legend:{ display :true},
    }
  };

  public lineChartType:ChartType = 'line'
  
  userId = sessionStorage.getItem('userId') || '';

 
  
  ngOnInit(): void {
    this.organizerData.getOrganizerData(+this.userId).subscribe((data: Organizer) => {
      const monthlyRevenueData:MonthlyRevenueData = data.data.monthlyRevenueData;
      this.lineChartData.datasets = [{
        data:Object.values(monthlyRevenueData),
        label: 'Monthly Revenue',
        backgroundColor: 'rgba(255,0,0,0.1)',
        borderColor: '#E62E05',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }];
      this.lineChartData.labels = Object.keys(monthlyRevenueData);
      this.chart?.update()
    })

  }
    
    
}
