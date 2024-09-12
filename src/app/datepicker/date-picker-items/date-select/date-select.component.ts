import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal
} from "@angular/core";
// import { DatePickerService } from "@app/core/services/date-picker/date-picker.service";
import { DatePickerService } from "../../date-picker-services/date-picker.service";
// import { cn } from "@root/helpers/functions";
import { cn } from "../../datehelper/helpers";

@Component({
  selector: "fnc-date-select",
  standalone: true,
  imports: [],
  template: ""
})
export class DateSelectComponent implements OnInit {
  @Input() selectedDate: Date = new Date();
  @Output() selectedDateChange = new EventEmitter<Date>();
  @Output() displayDropdownChange = new EventEmitter<boolean>();

  calendarData: Date[][] = [];
  viewDate: Date = new Date();
  selectedDropdown = signal("day");
  isYearDefault = signal(false);
  days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  months: { value: number; name: string }[] = [];
  years: number[] = [];
  selectedYear = signal(new Date().getFullYear());

  cn = cn;

  constructor(public dateService: DatePickerService) {
    this.months = this.dateService.getMonths();
    this.years = this.dateService.getYears();

    this.selectedDropdown.set(
      this.dateService.isYearDefault() ? "year" : "day"
    );
    this.isYearDefault.set(this.dateService.isYearDefault());
  }

  prevMonth(): void {
    this.viewDate = this.dateService.subtractMonth(this.viewDate);
    this.calendarData = this.updateCalendar(this.viewDate);
  }

  nextMonth(): void {
    this.viewDate = this.dateService.addMonth(this.viewDate);
    this.calendarData = this.updateCalendar(this.viewDate);
  }

  selectMonth(month: number): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), month, 1);
    this.calendarData = this.updateCalendar(this.viewDate);
    if (this.dateService.isYearDefault()) {
      this.selectedDateChange.emit(this.viewDate);
      this.updateSelectedDropdown("year");
    } else {
      this.updateSelectedDropdown("day");
    }
  }

  selectYear(year: number): void {
    this.selectedYear.set(year);
    this.viewDate = new Date(year, this.viewDate.getMonth(), 1);
    this.calendarData = this.updateCalendar(this.viewDate);
    if (this.dateService.isYearDefault()) {
      this.selectedDateChange.emit(this.viewDate);
      this.displayDropdownChange.emit(false);
      this.updateSelectedDropdown("year");
    } else {
      this.updateSelectedDropdown("day");
    }
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
    this.selectedDateChange.emit(this.selectedDate);
    this.viewDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.calendarData = this.updateCalendar(this.viewDate);
    this.displayDropdownChange.emit(false);
  }

  updateCalendar(date: Date) {
    const daysInMonth = this.dateService.getDaysInMonth(
      date.getMonth(),
      date.getFullYear()
    );
    const firstDay = this.dateService.getFirstDayOfMonth(date);
    const calendar: Date[][] = [];

    let week: Date[] = [];

    for (let i = 0; i < daysInMonth + firstDay; i++) {
      const day = new Date(
        date.getFullYear(),
        date.getMonth(),
        i - firstDay + 1
      );
      week.push(day);

      if (week.length === 7) {
        calendar.push(week);
        week = [];
      } else if (i === daysInMonth + firstDay + 1) {
        calendar.push(week);
      }
    }

    // Check if the last week is not complete and the next month is needed
    if (week.length > 0) {
      let nextMonthStartDay = 1;

      // Add days from the next month to complete the last week
      for (let i = week.length; i < 7; i++) {
        const day = new Date(
          this.dateService.addMonth(date).getFullYear(),
          this.dateService.addMonth(date).getMonth(),
          nextMonthStartDay
        );
        week.push(day);
        nextMonthStartDay++;
      }

      // Check if the last week is not the same as the first week of the next month
      const lastWeekOfCurrentMonth = calendar[calendar.length - 1];
      const firstDayOfNextMonth = new Date(
        this.dateService.addMonth(date).getFullYear(),
        this.dateService.addMonth(date).getMonth(),
        1
      );

      if (
        lastWeekOfCurrentMonth[0].getTime() !== firstDayOfNextMonth.getTime()
      ) {
        calendar.push(week);
      }
    }
    return calendar;
  }

  updateSelectedDropdown(val: string): void {
    this.selectedDropdown.set(val);
  }

  ngOnInit(): void {
    this.viewDate = new Date(this.selectedDate);
    this.calendarData = this.updateCalendar(this.viewDate);
  }
}
