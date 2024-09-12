import { TestBed } from "@angular/core/testing";
import { NotificationService } from "@notifications//notification.service";
import { ToastrService } from "ngx-toastr";
import { DatePickerService } from "./date-picker.service";

describe("DatePickerService", () => {
  let service: DatePickerService;
  let notificationService: NotificationService;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePickerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});

describe("getDaysInMonth", () => {
  let service: DatePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePickerService);
  });

  it("should return 31 for January", () => {
    expect(service.getDaysInMonth(0, 2022)).toEqual(31);
  });

  it("should return 28 for February in a non-leap year", () => {
    expect(service.getDaysInMonth(1, 2021)).toEqual(28);
  });

  it("should return 29 for February in a leap year", () => {
    expect(service.getDaysInMonth(1, 2020)).toEqual(29);
  });

  it("should return 30 for April", () => {
    expect(service.getDaysInMonth(3, 2022)).toEqual(30);
  });

  it("should return 31 for December", () => {
    expect(service.getDaysInMonth(11, 2022)).toEqual(31);
  });
});

describe("getFirstDayOfMonth", () => {
  let service: DatePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePickerService);
  });

  it("should return 5 (Saturday) for January 1, 2022", () => {
    expect(service.getFirstDayOfMonth(new Date(2022, 0, 1))).toEqual(5);
  });

  it("should return 1 (Tuesday) for February 1, 2022", () => {
    expect(service.getFirstDayOfMonth(new Date(2022, 1, 1))).toEqual(1);
  });

  it("should return 1 (Tuesday) for March 1, 2022", () => {
    expect(service.getFirstDayOfMonth(new Date(2022, 2, 1))).toEqual(1);
  });

  it("should return 4 (Friday) for April 1, 2022", () => {
    expect(service.getFirstDayOfMonth(new Date(2022, 3, 1))).toEqual(4);
  });

  it("should return 6 (Sunday) for May 1, 2022", () => {
    expect(service.getFirstDayOfMonth(new Date(2022, 4, 1))).toEqual(6);
  });
});

describe("isLeapYear", () => {
  let service: DatePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePickerService);
  });

  it("should return true for leap years", () => {
    expect(service.isLeapYear(2000)).toEqual(true);
    expect(service.isLeapYear(2004)).toEqual(true);
    expect(service.isLeapYear(2008)).toEqual(true);
  });

  it("should return false for non-leap years", () => {
    expect(service.isLeapYear(2001)).toEqual(false);
    expect(service.isLeapYear(2002)).toEqual(false);
    expect(service.isLeapYear(2003)).toEqual(false);
  });

  it("should return false for years divisible by 100 but not by 400", () => {
    expect(service.isLeapYear(1900)).toEqual(false);
    expect(service.isLeapYear(2100)).toEqual(false);
  });

  it("should return true for years divisible by 400", () => {
    expect(service.isLeapYear(1600)).toEqual(true);
    expect(service.isLeapYear(2000)).toEqual(true);
  });
});

describe("addMonth", () => {
  let service: DatePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePickerService);
  });

  it("should return the same day in the next month", () => {
    const date = new Date(2022, 0, 15);
    const newDate = service.addMonth(date);
    expect(newDate.getFullYear()).toEqual(2022);
    expect(newDate.getMonth()).toEqual(1);
    expect(newDate.getDate()).toEqual(1);
  });

  it("should adjust the day if the next month has fewer days", () => {
    const date = new Date(2022, 0, 31);
    const newDate = service.addMonth(date);
    expect(newDate.getFullYear()).toEqual(2022);
    expect(newDate.getMonth()).toEqual(1);
    expect(newDate.getDate()).toEqual(1);
  });

  it("should move to the next year if the current month is December", () => {
    const date = new Date(2022, 11, 15);
    const newDate = service.addMonth(date);
    expect(newDate.getFullYear()).toEqual(2023);
    expect(newDate.getMonth()).toEqual(0);
    expect(newDate.getDate()).toEqual(1);
  });
});

describe("subtractMonth", () => {
  let service: DatePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePickerService);
  });

  it("should return the same day in the previous month", () => {
    const date = new Date(2022, 1, 15);
    const newDate = service.subtractMonth(date);
    expect(newDate.getFullYear()).toEqual(2022);
    expect(newDate.getMonth()).toEqual(0);
    expect(newDate.getDate()).toEqual(1);
  });

  it("should adjust the day if the previous month has fewer days", () => {
    const date = new Date(2022, 3, 31);
    const newDate = service.subtractMonth(date);
    expect(newDate.getFullYear()).toEqual(2022);
    expect(newDate.getMonth()).toEqual(3);
    expect(newDate.getDate()).toEqual(1);
  });

  it("should move to the previous year if the current month is January", () => {
    const date = new Date(2022, 0, 15);
    const newDate = service.subtractMonth(date);
    expect(newDate.getFullYear()).toEqual(2021);
    expect(newDate.getMonth()).toEqual(11);
    expect(newDate.getDate()).toEqual(1);
  });
});

describe("getMonths", () => {
  let service: DatePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePickerService);
  });

  it("should return an array of 12 months", () => {
    const months = service.getMonths();
    expect(months.length).toEqual(12);
  });

  it("should return the correct month names", () => {
    const months = service.getMonths();
    expect(months[0].name).toEqual("January");
    expect(months[1].name).toEqual("February");
    expect(months[2].name).toEqual("March");
    expect(months[3].name).toEqual("April");
    expect(months[4].name).toEqual("May");
    expect(months[5].name).toEqual("June");
    expect(months[6].name).toEqual("July");
    expect(months[7].name).toEqual("August");
    expect(months[8].name).toEqual("September");
    expect(months[9].name).toEqual("October");
    expect(months[10].name).toEqual("November");
    expect(months[11].name).toEqual("December");
  });
});

describe("getYears", () => {
  let service: DatePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePickerService);
  });

  it("should return an array of 61 years", () => {
    const years = service.getYears();
    expect(years.length).toEqual(61);
  });

  it("should return the correct range of years", () => {
    const years = service.getYears();
    expect(years[0]).toEqual(new Date().getFullYear() - 30);
    expect(years[60]).toEqual(new Date().getFullYear() + 30);
  });
});

describe("getMonthName", () => {
  let service: DatePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePickerService);
  });

  it("should return 'January' for 0", () => {
    expect(service.getMonthName(0)).toEqual("January");
  });

  it("should return 'February' for 1", () => {
    expect(service.getMonthName(1)).toEqual("February");
  });

  it("should return 'March' for 2", () => {
    expect(service.getMonthName(2)).toEqual("March");
  });

  it("should return 'April' for 3", () => {
    expect(service.getMonthName(3)).toEqual("April");
  });

  it("should return 'May' for 4", () => {
    expect(service.getMonthName(4)).toEqual("May");
  });

  it("should return 'June' for 5", () => {
    expect(service.getMonthName(5)).toEqual("June");
  });

  it("should return 'July' for 6", () => {
    expect(service.getMonthName(6)).toEqual("July");
  });

  it("should return 'August' for 7", () => {
    expect(service.getMonthName(7)).toEqual("August");
  });

  it("should return 'September' for 8", () => {
    expect(service.getMonthName(8)).toEqual("September");
  });

  it("should return 'October' for 9", () => {
    expect(service.getMonthName(9)).toEqual("October");
  });

  it("should return 'November' for 10", () => {
    expect(service.getMonthName(10)).toEqual("November");
  });

  it("should return 'December' for 11", () => {
    expect(service.getMonthName(11)).toEqual("December");
  });
});
