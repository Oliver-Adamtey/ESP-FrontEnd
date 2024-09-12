import { Injectable, inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Organizer, Data, MonthlyRevenueData } from '@interface/Admin/Organizer-dashboard/Organizer-dashboard';
import { Observable, map } from 'rxjs';
import { Analytics } from '@interface/Admin/admin-analytics';

@Injectable({
  providedIn: 'root'
})
export class OrganizerDashboardService {

  private http = inject(HttpClient);
  private OrgAnalyticsUrl = `${environment.BASE_URL}/org-analytics/data/`;


  getOrganizerData(id: number): Observable<Organizer> {
    return this.http.get<Organizer>(this.OrgAnalyticsUrl + id);
  }

  getDailyTicketSalesPercentage(id: number): Observable<number> {
    return this.getOrganizerData(id).pipe(
      map((organizer: Organizer) => {
        const dailyData = organizer.data.bestSellingDataDaily;
        const totalTickets = dailyData.ticketsSoldToday + dailyData.ticketsLeft;
        const percentage = totalTickets > 0 ? (dailyData.ticketsSoldToday / totalTickets) * 100 : 0;
        return percentage;
      })
    )
  }

  getAnalyticsData(id:number):Observable<Analytics> {
    return this.http.get<Analytics>(this.OrgAnalyticsUrl + id)
  }

}
