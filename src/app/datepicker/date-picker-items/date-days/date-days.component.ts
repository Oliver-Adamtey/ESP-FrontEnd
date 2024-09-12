import { Component, HostBinding } from "@angular/core";
import { DateSelectComponent } from "../date-select/date-select.component";

@Component({
  selector: "fnc-date-days",
  standalone: true,
  imports: [],
  template: `
    @for (day of days; track day) {
      <span class="flex items-center justify-center w-7 h-7">{{
        day.slice(0, 2)
      }}</span>
    }
  `
})
export class DateDaysComponent extends DateSelectComponent {
  @HostBinding("class") get dateDaysClass() {
    return "grid grid-cols-7 gap-2 w-max mx-auto cursor-default";
  }
}
