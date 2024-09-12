import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GetEventService } from './get-event.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';


const mockToastrConfig = {}

describe('GetEventService', () => {
  let service: GetEventService;
  let mochHttp:HttpClientTestingModule

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, ToastrModule.forRoot()],
      providers: [
        { provide: ToastrService, useValue:ToastrService },
        {provide: new InjectionToken('ToastConfig'), useValue:mockToastrConfig}
      ]
    });
    service = TestBed.inject(GetEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
