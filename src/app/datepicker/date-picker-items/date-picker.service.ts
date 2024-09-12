import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DatePickerService {
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

  getThisWeek(): Date[] {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const start = new Date(today.setDate(diff));
    const end = new Date(today.setDate(diff + 6));
    return [start, end];
  }

  getLastWeek(): Date[] {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - diffToLastMonday - 7);
    lastMonday.setHours(0, 0, 0, 0);

    const lastSunday = new Date(lastMonday);
    lastSunday.setDate(lastMonday.getDate() + 6);
    lastSunday.setHours(23, 59, 59, 999);

    return [lastMonday, lastSunday];
  }

  getThisMonth(): Date[] {
    const start = new Date();
    start.setDate(1);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    return [start, end];
  }

  getLastMonth(): Date[] {
    const start = new Date();
    start.setDate(0);
    start.setDate(1);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    return [start, end];
  }

  getThisYear(): Date[] {
    const start = new Date(new Date().getFullYear(), 0, 1);
    const end = new Date(new Date().getFullYear(), 11, 31);
    return [start, end];
  }

  getLastYear(): Date[] {
    const start = new Date(new Date().getFullYear() - 1, 0, 1);
    const end = new Date(new Date().getFullYear() - 1, 11, 31);
    return [start, end];
  }

  getLastThirtyDays(): Date[] {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);
    return [start, end];
  }

  getLastSixtyDays(): Date[] {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 60);
    return [start, end];
  }

  getLastNinetyDays(): Date[] {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 90);
    return [start, end];
  }

  getLastSixMonths(): Date[] {
    const end = new Date();
    end.setDate(0);
    const start = new Date();
    start.setMonth(end.getMonth() - 5);
    start.setDate(1);
    return [start, end];
  }

  getLastTwelveMonths(): Date[] {
    const end = new Date();
    end.setDate(0);
    const start = new Date();
    start.setMonth(end.getMonth() - 11);
    start.setDate(1);
    return [start, end];
  }

  getFirstQuarter(): Date[] {
    const year = new Date().getFullYear();
    return [new Date(year, 0, 1), new Date(year, 2, 31)];
  }

  getSecondQuarter(): Date[] {
    const year = new Date().getFullYear();
    return [new Date(year, 3, 1), new Date(year, 5, 30)];
  }

  getThirdQuarter(): Date[] {
    const year = new Date().getFullYear();
    return [new Date(year, 6, 1), new Date(year, 8, 30)];
  }

  getFourthQuarter(): Date[] {
    const year = new Date().getFullYear();
    return [new Date(year, 9, 1), new Date(year, 11, 31)];
  }

  getLastQuarter(): Date[] {
    const today = new Date();
    const month = today.getMonth();
    let startMonth = 0;

    // Determine the start month of the last quarter
    if (month >= 0 && month <= 2) {
      // Jan - Mar
      startMonth = 9;
      today.setFullYear(today.getFullYear() - 1);
    } else if (month >= 6 && month <= 8) {
      // Jul - Sep
      startMonth = 3;
    } else if (month >= 9 && month <= 11) {
      // Oct - Dec
      startMonth = 6;
    }

    // Set start date to the first day of the start month of the last quarter
    const start = new Date(today.getFullYear(), startMonth, 1);

    // Set end date to the last day of the last month of the last quarter
    const end = new Date(today.getFullYear(), startMonth + 3, 0);

    return [start, end];
  }
}
