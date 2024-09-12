import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AttendeeEventComponent } from './attendee-event.component';
import { ActivatedRoute } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';


const moctTostrConfig = {}
describe('AttendeeEventComponent', () => {
  let component: AttendeeEventComponent;
  let fixture: ComponentFixture<AttendeeEventComponent>;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeEventComponent, HttpClientModule, ToastrModule.forRoot() ],
      providers:[
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } },
        {provide: ToastrService, useClass:ToastrService} ,
        {provide:new InjectionToken('ToastConfig'), useValue:moctTostrConfig}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });  
});
