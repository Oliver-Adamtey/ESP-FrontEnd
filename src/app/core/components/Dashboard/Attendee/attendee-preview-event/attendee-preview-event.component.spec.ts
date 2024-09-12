import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AttendeePreviewEventComponent } from './attendee-preview-event.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('AttendeePreviewEventComponent', () => {
  let component: AttendeePreviewEventComponent;
  let fixture: ComponentFixture<AttendeePreviewEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeePreviewEventComponent, HttpClientModule, ToastrModule.forRoot()],
      providers:[
        { provide: ActivatedRoute, useValue: { snapshot: { params: { eventId: '123' } } } }  
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeePreviewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
