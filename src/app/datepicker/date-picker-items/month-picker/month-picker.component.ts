import { Component, HostBinding, input, output } from "@angular/core";
import { DateSelectComponent } from "../date-select/date-select.component";

@Component({
  selector: "fnc-month-picker",
  standalone: true,
  imports: [],
  template: `
    @for (month of months; track month) {
      <button
        (click)="$event.stopPropagation(); selectMonthValue(month.value)"
        [class]="
          cn(
            'py-1 w-14 rounded-lg flex items-center justify-center text-neutral-N600 transition-all duration-200 ease-linear border border-transparent hover:border-orange-O400',
            {
              'bg-orange-O50 text-orange-O400':
                month.value === date().getMonth()
            }
          )
        "
        [attr.data-year]="month"
      >
        {{ month.name.slice(0, 3) }}
      </button>
    }
  `
})
export class MonthPickerComponent extends DateSelectComponent {
  date = input<Date>(new Date());
  changeMonthtDropdown = output<number>();

  @HostBinding("class") get monthPickerClass() {
    return "grid grid-cols-2 gap-x-4 gap-y-2 mx-auto w-max place-items-center";
  }

  selectMonthValue(month: number) {
    this.changeMonthtDropdown.emit(month);
  }
}
