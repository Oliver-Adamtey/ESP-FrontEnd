import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AttendeeMyEventsComponent } from './attendee-my-events.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

describe('AttendeeMyEventsComponent', () => {
  let component: AttendeeMyEventsComponent;
  let fixture: ComponentFixture<AttendeeMyEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeMyEventsComponent, HttpClientModule, ToastrModule.forRoot()],
      providers:[
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeMyEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
