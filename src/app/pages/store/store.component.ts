import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LayoutsComponent } from '../../components/layouts/layouts.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DateModule } from '../../date/date.module';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    LayoutsComponent, 
    CommonModule,
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    DateModule
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
  dateRange: { start: Date | null, end: Date | null } = { start: null, end: null };

  events: any[] = [];
  private token = 'your-token-here';
  private baseUrl = 'https://your-api-url.com'; // Replace with your actual base URL

  constructor(private http: HttpClient) {}

  onDateChange() {
    if (this.dateRange && this.dateRange.start && this.dateRange.end) {
      const startDate = this.formatDate(this.dateRange.start);
      const endDate = this.formatDate(this.dateRange.end);

      this.getEventsByDate(startDate, endDate).subscribe({
        next: (res: any) => {
          this.events = res.content;
          this.applyFilters();
        },
        error: (error: HttpErrorResponse) => {
          console.log('Error fetching events by date:', error);
        }
      });
    }
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  private getEventsByDate(startDate: string, endDate: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any[]>(`${this.baseUrl}/find-event/filters?eventStartDate=${startDate}&eventEndDate=${endDate}`, { headers });
  }

  applyFilters() {
    // Implement your filter logic here
  }

  clearOtherFilters(filterType: string) {
    // Implement your logic to clear other filters if needed
  }

  onFilterChange(filterType: string, value: string) {
    // Implement your logic for other filter changes if needed
  }
}
