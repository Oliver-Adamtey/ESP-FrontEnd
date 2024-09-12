import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrganizerCreateEventBarComponent } from './organizer-create-event-bar.component';
import { ToastrService, ToastrModule, Toast } from 'ngx-toastr';

describe('OrganizerCreateEventBarComponent', () => {
  let component: OrganizerCreateEventBarComponent;
  let fixture: ComponentFixture<OrganizerCreateEventBarComponent>;
  let toastrService:ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerCreateEventBarComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [ToastrService]  // Add ToastrService to the providers list in the TestBed configuration
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerCreateEventBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
