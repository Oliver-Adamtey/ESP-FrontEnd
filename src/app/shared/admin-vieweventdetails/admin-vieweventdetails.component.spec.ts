import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminVieweventdetailsComponent } from './admin-vieweventdetails.component';
import { ActivatedRoute } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('AdminVieweventdetailsComponent', () => {
  let component: AdminVieweventdetailsComponent;
  let fixture: ComponentFixture<AdminVieweventdetailsComponent>;
  let toastrService:ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVieweventdetailsComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { params: { id: '123' } } },
        { provide: ToastrService, useValue: jasmine.createSpyObj('ToastrService', ['success', 'error']) },  // Mocking the ToastrService for testing purposes
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminVieweventdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
