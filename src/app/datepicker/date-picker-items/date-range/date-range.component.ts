import { DatePipe, NgTemplateOutlet } from "@angular/common";
import {
  AfterViewInit,
  Component,
  HostBinding,
  inject,
  Injector,
  input,
  OnInit,
  output,
  signal
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DateDaysComponent } from "../date-days/date-days.component";
import { DateRangeActionsComponent } from "../date-range-actions/date-range-actions.component";
import { DateSelectComponent } from "../date-select/date-select.component";
import { MonthPickerComponent } from "../month-picker/month-picker.component";
import { YearPickerComponent } from "../year-picker/year-picker.component";

@Component({
  selector: "fnc-date-range",
  standalone: true,
  imports: [
    DatePipe,
    DateDaysComponent,
    DateRangeActionsComponent,
    NgTemplateOutlet,
    MonthPickerComponent,
    YearPickerComponent
  ],
  templateUrl: "./date-range.component.html"
})
export class RangeComponent
  extends DateSelectComponent
  implements OnInit, AfterViewInit
{
  @HostBinding("class") get dateRangeClass() {
    return "rounded-lg min-w-[32rem] h-max px-4 bg-white flex divide-x-2 divide-neutral-N300 text-neutral-N600";
  }

  injector = inject(Injector);
  router = inject(Router);
  route = inject(ActivatedRoute);

  inputDateRange = input<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null
  });

  outputDateRange = output<{
    start: Date | null;
    end: Date | null;
  }>();

  dateRangeStart = signal<Date | null>(null);
  dateRangeEnd = signal<Date | null>(null);
  startRangeDropdownType = signal<"day" | "month" | "year">("day");
  endRangeDropdownType = signal<"day" | "month" | "year">("day");
  selectedAutoRangeValue = signal<string | null>(null);

  dateRange = signal<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null
  });

  startMonth = signal(
    this.dateService.subtractMonth(this.inputDateRange().start ?? this.viewDate)
  );
  endMonth = signal(this.inputDateRange().end ?? this.viewDate);

  startMonthDays = signal<Date[][]>([]);
  endMonthDays = signal<Date[][]>([]);
  hoveredDay = signal<Date | null>(null);

  startMonthVal = {
    year: this.startMonth().getFullYear(),
    month: this.startMonth().getMonth(),
    day: this.startMonth().getDate()
  };

  endMonthVal = {
    year: this.endMonth().getFullYear(),
    month: this.endMonth().getMonth(),
    day: this.endMonth().getDate()
  };


  selectStartMonthPrev() {
    this.startMonth.set(this.dateService.subtractMonth(this.startMonth()));
    this.startMonthDays.set(this.updateCalendar(this.startMonth()));
  }
  selectStartMonthNext() {
    this.startMonth.set(this.dateService.addMonth(this.startMonth()));
    this.startMonthDays.set(this.updateCalendar(this.startMonth()));
  }

  selectEndMonthPrev() {
    this.endMonth.set(this.dateService.subtractMonth(this.endMonth()));
    this.endMonthDays.set(this.updateCalendar(this.endMonth()));
  }
  selectEndMonthNext() {
    this.endMonth.set(this.dateService.addMonth(this.endMonth()));
    this.endMonthDays.set(this.updateCalendar(this.endMonth()));
  }

  selectStartDate(value: Date | number, type: string) {
    if (typeof value === "number") {
      if (type === "year") {
        this.startMonthVal.year = value;
      } else {
        this.startMonthVal.month = value;
      }
    } else {
      this.startMonthVal.day = value.getDate();
    }

    this.startMonth.set(
      new Date(
        this.startMonthVal.year,
        this.startMonthVal.month,
        this.startMonthVal.day
      )
    );
    this.startMonthDays.set(this.updateCalendar(this.startMonth()));
    this.startRangeDropdownType.set("day");
  }

  selectEndDate(value: Date | number, type: string) {
    if (typeof value === "number") {
      if (type === "year") {
        this.endMonthVal.year = value;
      } else {
        this.endMonthVal.month = value;
      }
    } else {
      this.endMonthVal.day = value.getDate();
    }

    this.endMonth.set(
      new Date(
        this.endMonthVal.year,
        this.endMonthVal.month,
        this.endMonthVal.day
      )
    );
    this.endMonthDays.set(this.updateCalendar(this.endMonth()));
    this.endRangeDropdownType.set("day");
  }

  setStartAndEndMonthDays(date?: Date, isEndtate?: boolean) {
    if (date && !isEndtate) {
      this.startMonth.set(new Date(date.getFullYear(), date.getMonth()));
      this.startMonthDays.set(this.updateCalendar(this.startMonth()));

      this.endMonth.set(
        this.dateService.addMonth(new Date(date.getFullYear(), date.getMonth()))
      );
    }
    if (
      isEndtate &&
      this.dateRange().start!.getMonth() !== this.dateRange().end!.getMonth()
    ) {
      this.endMonth.set(
        new Date(
          this.dateRange().end!.getFullYear(),
          this.dateRange().end!.getMonth()
        )
      );
    }
    this.endMonthDays.set(this.updateCalendar(this.endMonth()));
  }

  selectDateRange(date: Date) {
    this.selectedAutoRangeValue.set(null);

    if (
      !this.dateRange().end! &&
      this.dateRange().start &&
      this.dateRange().start! > date
    ) {
      return;
    }

    if (!this.dateRange().start && !this.dateRange().end) {
      this.dateRange.set({
        start: date,
        end: null
      });
      this.setStartAndEndMonthDays(date);
      return;
    }

    if (this.dateRange().start && !this.dateRange().end) {
      this.dateRange.set({
        start: this.dateRange().start,
        end: date
      });

      if (this.dateRange().end?.getMonth() !== date.getMonth()) {
        this.endMonth.set(
          this.dateService.addMonth(
            new Date(date.getFullYear(), date.getMonth())
          )
        );
        this.endMonthDays.set(this.updateCalendar(this.endMonth()));
      }
      this.setStartAndEndMonthDays(date, true);

      this.outputDateRange.emit(this.dateRange());
      this.displayDropdownChange.emit(false);
      return;
    }

    if (this.dateRange().start && this.dateRange().end) {
      this.dateRange.set({
        start: date,
        end: null
      });
      this.setStartAndEndMonthDays(date);
    }
  }

  handleHoveredDays(day: Date) {
    this.hoveredDay.set(day);
  }


  override ngOnInit(): void {

    this.dateRange.set({
      start: this.inputDateRange().start,
      end: this.inputDateRange().end
    });
    if (this.inputDateRange().start) {
      this.startMonth.set(this.inputDateRange().start!);
      this.endMonth.set(this.inputDateRange().end!);
    }
  }

  ngAfterViewInit(): void {
    this.startMonthDays.set(this.updateCalendar(this.startMonth()));
    if (
      this.inputDateRange().end &&
      this.inputDateRange().start?.getMonth() ===
        this.inputDateRange().end?.getMonth()
    ) {
      this.endMonth.set(this.dateService.addMonth(new Date(this.endMonth())));
    } else {
      this.endMonthDays.set(this.updateCalendar(this.endMonth()));
    }
    this.endMonthDays.set(this.updateCalendar(this.endMonth()));
  }
}
