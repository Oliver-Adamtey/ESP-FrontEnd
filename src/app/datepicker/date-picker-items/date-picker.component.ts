import { animate, style, transition, trigger } from "@angular/animations";
import { CommonModule, DatePipe } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  inject,
  input,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { DatePickerService } from "../date-picker-services/date-picker.service";
import { RangeComponent } from "./date-range/date-range.component";
import { cn } from "../datehelper/helpers";
import { allEventdetails, allEventResponse } from "@interface/all-eventdetails/all-eventdetails";
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from "@notifications//notification.service";

@Component({
  selector: "fnc-date-picker",
  standalone: true,
  imports: [
    DatePipe,
    RangeComponent,
    CommonModule,
    FormsModule
  ],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
  }],
  template: `
    <div>
      <button
        role="button"
        #dateInput
        id="dateInput"
        (click)="$event.stopPropagation(); updateDropdown(!displayDropdown())"
        [(ngModel)]="filterByDate"
        [class]="
          cn(
            'bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block pl-10 py-2.5 w-full',
            {
              'flex-row-reverse': isYearDefault,
              'bg-neutral-N100 pointer-events-none hover:border-neutral-N300':
                disabled
            }
          )
        "
      >
        <span *ngIf="dateRangeValue().start; else noDateRange" class="flex gap-1">
          {{ dateRangeValue().start | date: "dd MMM y" }} - 
          {{ dateRangeValue().end | date: "dd MMM y" }}
        </span>
        <ng-template #noDateRange>
          {{ selectedDate | date: (isYearDefault ? "y" : "dd MMM y") || "YYYY-MM-DD" }}
        </ng-template>
      </button>
      <img src="assets/esp/dashboard/date.png" alt="Filter Icon" class="absolute top-1/2 transform -translate-y-1/2 left-3 w-4" />
    </div>
      <section
        *ngIf="displayDropdown()"
        class="flex bg-white shadow-elevation2 absolute left-0 top-14 z-50 border rounded-lg  w-max"
        fncClickOutClose
        (clickOut)="updateDropdown(false)"
        [@datepickerAnimation]="displayDropdown()"
      >
        <fnc-date-range
          (displayDropdownChange)="updateDropdown($event)"
          (outputDateRange)="selectDateRange($event)"
          [inputDateRange]="dateRangeValue()"
        ></fnc-date-range>
      </section>
  `,
  animations: [
    trigger("datepickerAnimation", [
      transition(":enter", [
        style({ transform: "translateY(-20px)", opacity: 0 }),
        animate(
          "200ms linear",
          style({ opacity: 1, transform: "translateY(0)" })
        )
      ]),

      transition(":leave", [
        animate(
          "300ms linear",
          style({ transform: "translateY(-20px)", opacity: 0 })
        )
      ])
    ])
  ]
})

export class DatePickerComponent implements OnInit {
  cn = cn;

  @Input() events: allEventdetails[] = [];
  allEvents: allEventdetails[] = [];
  filterByDate: string = "";

  @Input() defaultDate = "";
  @Input() disabled? = false;

  type = input<"calendar" | "range">("calendar");
  inputDateRange = input<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null
  });

  selectedDate: Date = new Date();
  isYearDefault = false;
  displayDropdown = signal(false);
  dateRangeValue = signal<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null
  });

  @ViewChild('dateInput') picker!: ElementRef;
  @Output() selectedDateChange = new EventEmitter<Date>();
  @Output() dateChange = new EventEmitter<{ start: Date | null; end: Date | null }>();

  

  clear() {
    this.dateRangeValue.set({ start: null, end: null });
    this.dateChange.emit({ start: null, end: null });
  }

  dateService = inject(DatePickerService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  notificationService = inject(NotificationService)

  

  constructor() {
    this.isYearDefault = this.dateService.isYearDefault();
  }

  @HostBinding("class") get HostClass() {
    return cn("flex flex-col relative z-50");
  }

  selectDateRange(dateRange: { start: Date | null; end: Date | null }) {
    if (dateRange.start && dateRange.end) {
      this.dateRangeValue.set(dateRange);
      this.dateChange.emit(dateRange);
    }
  }

  onDateRangeSelect(startDate: Date | null, endDate: Date | null) {
    this.dateChange.emit({ start: startDate, end: endDate });
  }
  
  

  ngOnInit() {
    
    if (this.defaultDate) {
      this.selectedDate = new Date(this.defaultDate);
    }
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.selectedDate = new Date();
      }
    });
    this.selectedDateChange.emit(this.selectedDate);
  }

  updateSelectedDate(val: Date): void {
    this.selectedDate = val;
    this.selectedDateChange.emit(val);
  }

  updateDropdown(val: boolean): void {
    this.displayDropdown.set(val);
  }

  onDateSelected(date: { start: Date | null; end: Date | null }) {
    this.dateChange.emit(date);
  }
  
  private formatDate(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd')!;
  }
}
