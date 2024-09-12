// import { ComponentFixture, TestBed } from "@angular/core/testing";

// import { HttpClientTestingModule } from "@angular/common/http/testing";
// import { DatePickerService } from "../date-picker.service";
// import { CalendarComponent } from "../calendar/calendar.component";

// describe("DatePickerDropdownComponent", () => {
//   let component: CalendarComponent;
//   let fixture: ComponentFixture<CalendarComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [CalendarComponent, HttpClientTestingModule]
//     }).compileComponents();

//     fixture = TestBed.createComponent(CalendarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it("should create", () => {
//     expect(component).toBeTruthy();
//   });

//   describe("prevMonth", () => {
//     it("should subtract one month from viewDate", () => {
//       const initialDate = new Date();
//       component.viewDate = new Date(initialDate);

//       component.prevMonth();

//       const expectedDate = new Date(
//         initialDate.getFullYear(),
//         initialDate.getMonth() - 1,
//         1
//       );
//       expect(component.viewDate).toEqual(expectedDate);
//     });

//     it("should call updateCalendar", () => {
//       const updateCalendarSpy = jest.spyOn(component, "updateCalendar");

//       component.prevMonth();

//       expect(updateCalendarSpy).toHaveBeenCalled();
//     });
//   });

//   describe("nextMonth", () => {
//     it("should add one month to viewDate", () => {
//       const initialDate = new Date();
//       component.viewDate = new Date(initialDate);

//       component.nextMonth();

//       const expectedDate = new Date(
//         initialDate.getFullYear(),
//         initialDate.getMonth() + 1,
//         1
//       );
//       expect(component.viewDate).toEqual(expectedDate);
//     });

//     it("should call updateCalendar", () => {
//       const updateCalendarSpy = jest.spyOn(component, "updateCalendar");

//       component.nextMonth();

//       expect(updateCalendarSpy).toHaveBeenCalled();
//     });
//   });

//   describe("selectMonth", () => {
//     it("should set viewDate to the selected month", () => {
//       const initialDate = new Date();
//       component.viewDate = new Date(initialDate);
//       const selectedMonth = 6;

//       component.selectMonth(selectedMonth);

//       const expectedDate = new Date(
//         initialDate.getFullYear(),
//         selectedMonth,
//         1
//       );
//       expect(component.viewDate).toEqual(expectedDate);
//     });

//     it("should call updateCalendar", () => {
//       const updateCalendarSpy = jest.spyOn(component, "updateCalendar");
//       const selectedMonth = 6;

//       component.selectMonth(selectedMonth);

//       expect(updateCalendarSpy).toHaveBeenCalled();
//     });

//     it("should call updateSelectedDropdown with 'day'", () => {
//       const updateSelectedDropdownSpy = jest.spyOn(
//         component,
//         "updateSelectedDropdown"
//       );
//       const selectedMonth = 6;

//       component.selectMonth(selectedMonth);

//       expect(updateSelectedDropdownSpy).toHaveBeenCalledWith("day");
//     });
//   });

//   describe("selectYear", () => {
//     it("should set viewDate to the selected year", () => {
//       const initialDate = new Date();
//       component.viewDate = new Date(initialDate);
//       const selectedYear = 2022;

//       component.selectYear(selectedYear);

//       const expectedDate = new Date(selectedYear, initialDate.getMonth(), 1);
//       expect(component.viewDate).toEqual(expectedDate);
//     });

//     it("should call updateCalendar", () => {
//       const updateCalendarSpy = jest.spyOn(component, "updateCalendar");
//       const selectedYear = 2022;

//       component.selectYear(selectedYear);

//       expect(updateCalendarSpy).toHaveBeenCalled();
//     });

//     it("should call updateSelectedDropdown with 'day'", () => {
//       const updateSelectedDropdownSpy = jest.spyOn(
//         component,
//         "updateSelectedDropdown"
//       );
//       const selectedYear = 2022;

//       component.selectYear(selectedYear);

//       expect(updateSelectedDropdownSpy).toHaveBeenCalledWith("day");
//     });
//   });

//   describe("selectDate", () => {
//     it("should set selectedDate to the provided date", () => {
//       const date = new Date();
//       component.selectDate(date);
//       expect(component.selectedDate).toEqual(date);
//     });

//     it("should emit selectedDateChange event with the provided date", () => {
//       const date = new Date();
//       const selectedDateChangeSpy = jest.spyOn(
//         component.selectedDateChange,
//         "emit"
//       );
//       component.selectDate(date);
//       expect(selectedDateChangeSpy).toHaveBeenCalledWith(date);
//     });

//     it("should set viewDate to the first day of the provided date's month", () => {
//       const date = new Date();
//       const expectedViewDate = new Date(date.getFullYear(), date.getMonth(), 1);
//       component.selectDate(date);
//       expect(component.viewDate).toEqual(expectedViewDate);
//     });

//     it("should call updateCalendar", () => {
//       const date = new Date();
//       const updateCalendarSpy = jest.spyOn(component, "updateCalendar");
//       component.selectDate(date);
//       expect(updateCalendarSpy).toHaveBeenCalled();
//     });

//     it("should emit displayDropdownChange event with false", () => {
//       const date = new Date();
//       const displayDropdownChangeSpy = jest.spyOn(
//         component.displayDropdownChange,
//         "emit"
//       );
//       component.selectDate(date);
//       expect(displayDropdownChangeSpy).toHaveBeenCalledWith(false);
//     });
//   });

//   describe("updateCalendar", () => {
//     let dateService: DatePickerService;
//     let initialDate: Date;

//     beforeEach(() => {
//       dateService = TestBed.inject(DatePickerService);
//       initialDate = new Date();
//       component.viewDate = new Date(initialDate);
//     });

//     it("should call dateService.getDaysInMonth with correct arguments", () => {
//       const getDaysInMonthSpy = jest.spyOn(dateService, "getDaysInMonth");
//       component.updateCalendar(initialDate);

//       expect(getDaysInMonthSpy).toHaveBeenCalledWith(
//         initialDate.getMonth(),
//         initialDate.getFullYear()
//       );
//     });

//     it("should call dateService.getFirstDayOfMonth with correct arguments", () => {
//       const getFirstDayOfMonthSpy = jest.spyOn(
//         dateService,
//         "getFirstDayOfMonth"
//       );

//       component.updateCalendar(initialDate);

//       expect(getFirstDayOfMonthSpy).toHaveBeenCalledWith(initialDate);
//     });

//     it("should update calendarData correctly", () => {
//       component.updateCalendar(initialDate);

//       expect(component.calendarData).toBeDefined();
//       expect(component.calendarData.length).toBeGreaterThanOrEqual(4);
//     });
//   });

//   describe("updateSelectedDropdown", () => {
//     it("should update selectedDropdown to the passed value", () => {
//       const selectedDropdownValue = "day";

//       component.updateSelectedDropdown(selectedDropdownValue);

//       expect(component.selectedDropdown()).toEqual(selectedDropdownValue);
//     });

//     it("should update selectedDropdown to a different value", () => {
//       const initialDropdownValue = "day";
//       const newDropdownValue = "month";
//       component.selectedDropdown.set(initialDropdownValue);

//       component.updateSelectedDropdown(newDropdownValue);

//       expect(component.selectedDropdown()).not.toEqual(initialDropdownValue);
//       expect(component.selectedDropdown()).toEqual(newDropdownValue);
//     });
//   });

//   describe("ngOnInit", () => {
//     it("should set viewDate to selectedDate", () => {
//       const selectedDate = new Date();
//       component.selectedDate = selectedDate;

//       component.ngOnInit();

//       expect(component.viewDate).toEqual(selectedDate);
//     });

//     it("should call updateCalendar", () => {
//       const updateCalendarSpy = jest.spyOn(component, "updateCalendar");

//       component.ngOnInit();

//       expect(updateCalendarSpy).toHaveBeenCalled();
//     });
//   });
// });
