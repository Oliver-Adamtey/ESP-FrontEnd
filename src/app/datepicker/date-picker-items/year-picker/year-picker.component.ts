import { Component, HostBinding, input, output } from "@angular/core";
import { DateSelectComponent } from "../date-select/date-select.component";

@Component({
  selector: "fnc-year-picker",
  standalone: true,
  imports: [],
  template: `
    @for (year of years; let i = $index; track year) {
      <button
        (click)="$event.stopPropagation(); handleUpdateYearSelection(year)"
        [class]="
          cn(
            'w-14 py-1 rounded-lg flex items-center justify-center text-neutral-N600 transition-all duration-200 ease-linear border border-transparent hover:border-orange-O400',
            {
              'bg-orange-O50 text-orange-O400': year === yearInput()
            }
          )
        "
        [attr.data-year]="year"
      >
        {{ year }}
      </button>
    }
  `
})
export class YearPickerComponent extends DateSelectComponent {
  yearInput = input<number>(new Date().getFullYear());
  updateYearSelection = output<number>();

  @HostBinding("class") get yearPickerClass() {
    return "grid grid-cols-2 gap-x-4 gap-y-2 mx-auto w-max max-h-[14rem] overflow-y-auto no-scrollbar";
  }

  handleUpdateYearSelection(year: number) {
    this.updateYearSelection.emit(year);
  }
}
