import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { LocationAndVenueComponent } from './location-and-venue.component';

describe('LocationAndVenueComponent', () => {
  let component: LocationAndVenueComponent;
  let fixture: ComponentFixture<LocationAndVenueComponent>;
  let toastrService:ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationAndVenueComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [ToastrService]  // Add ToastrService to the providers list for testing purposes
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationAndVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
