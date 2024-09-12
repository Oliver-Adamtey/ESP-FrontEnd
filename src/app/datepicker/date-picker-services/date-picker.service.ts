import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environment";
import { allEventdetails, allEventResponse } from "../../core/Interface/all-eventdetails/all-eventdetails";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DatePickerService {

  token = sessionStorage.getItem('Token');

  constructor(
    private http: HttpClient,
  ) {}

  isYearDefault = signal(false);

  setIsYearDefault(value: boolean) {
    this.isYearDefault.set(value);
  }

  getDaysInMonth(month: number, year: number): number {
    return month === 1 && this.isLeapYear(year)
      ? 29
      : new Date(year, month + 1, 0).getDate();
  }

  getFirstDayOfMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDay(); 
  }

  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  addMonth(date: Date): Date {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    newDate.setDate(
      Math.min(
        newDate.getDate(),
        new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()
      )
    );
    return newDate;
  }

  subtractMonth(date: Date): Date {
    const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    newDate.setDate(
      Math.min(
        newDate.getDate(),
        new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate()
      )
    );
    return newDate;
  }

  getMonths(): { value: number; name: string }[] {
    const months: { value: number; name: string }[] = [];
    for (let i = 0; i < 12; i++) {
      months.push({ value: i, name: this.getMonthName(i) });
    }
    return months;
  }

  getYears(): number[] {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 30;
    const endYear = currentYear + 10;
    const years: number[] = [];
    for (let year = endYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  }

  getMonthName(month: number): string {
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    return new Date(2000, month, 1).toLocaleDateString(undefined, options);
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

}
