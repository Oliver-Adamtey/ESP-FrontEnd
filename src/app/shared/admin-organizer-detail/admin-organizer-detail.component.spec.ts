import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AdminOrganizerDetailComponent } from './admin-organizer-detail.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

describe('AdminOrganizerDetailComponent', () => {
  let component: AdminOrganizerDetailComponent;
  let fixture: ComponentFixture<AdminOrganizerDetailComponent>;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrganizerDetailComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { params: { id: '1' } } },
        ToastrService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminOrganizerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
