import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { DatePickerComponent } from "./date-picker.component";
import { ToastrService, ToastrModule } from "ngx-toastr";
import { InjectionToken } from "@angular/core";


const mockToastrConfig = {}

describe("DatePickerComponent", () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let toasterServer: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerComponent, HttpClientTestingModule, HttpClientModule, ToastrModule.forRoot()],
      providers: [
        {provide: ToastrService, useValue:ToastrService},
        {provide: new InjectionToken('ToastConfig'), useValue:mockToastrConfig}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  
});
