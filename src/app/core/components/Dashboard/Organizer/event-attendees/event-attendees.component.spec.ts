import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { EventAttendeesComponent } from './event-attendees.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

describe('EventAttendeesComponent', () => {
  let component: EventAttendeesComponent;
  let fixture: ComponentFixture<EventAttendeesComponent>;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventAttendeesComponent, HttpClientModule, ToastrModule.forRoot()],
      providers:[
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventAttendeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
