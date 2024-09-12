import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { DatePickerService } from "./date-picker.service";

describe("DatePickerService", () => {
  let service: DatePickerService;
  let mockHttp: HttpClientTestingModule

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(DatePickerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});

