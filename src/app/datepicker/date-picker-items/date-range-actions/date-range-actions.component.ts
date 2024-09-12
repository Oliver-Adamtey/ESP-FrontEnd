import { DatePipe } from "@angular/common";
import { Component, HostBinding, input, output, signal } from "@angular/core";
// import { SvgIconsComponent } from "../../../ui-kit/svg-icons/svg-icons.component";
// import { SvgiconTabComponent } from "../../svgicon-tab/svgicon-tab.component";

@Component({
  selector: "fnc-date-range-actions",
  standalone: true,
  imports: [
    // SvgiconTabComponent, 
    // SvgIconsComponent, 
    DatePipe
  ],
  template: `
    <div class="flex items-center space-x-4">
      <button (click)="prevMonth()" class="transform rotate-90 scale-75 cursor-pointer"></button>
      
      <button (click)="updateSelectedDropdown('month')" class="flex items-center gap-1 cursor-pointer">
        {{ date() | date: "MMM" }}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 14l-7-7h14z"/>
        </svg>
      </button>
      
      <button (click)="updateSelectedDropdown('year')" class="flex items-center gap-1 cursor-pointer">
        {{ date() | date: "yyyy" }}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 14l-7-7h14z"/>
        </svg>
      </button>
      
      <button (click)="nextMonth()" class="transform -rotate-90 scale-75 cursor-pointer"></button>
    </div>
  `
})
export class DateRangeActionsComponent {
  @HostBinding("class") get hostClass() {
    return "w-full flex gap-4 justify-between";
  }

  date = input(new Date());
  updatePrevMonth = output();
  updateDropdownType = output<"day" | "month" | "year">();
  updateNextMonth = output();

  dropdownType = signal<"day" | "month" | "year">("day");

  prevMonth() {
    this.updatePrevMonth.emit();
  }

  updateSelectedDropdown(type: "month" | "year") {
    if (this.dropdownType() === type) {
      this.dropdownType.set("day");
    } else {
      this.dropdownType.set(type);
    }
    this.updateDropdownType.emit(this.dropdownType());
  }

  nextMonth() {
    this.updateNextMonth.emit();
  }
}
