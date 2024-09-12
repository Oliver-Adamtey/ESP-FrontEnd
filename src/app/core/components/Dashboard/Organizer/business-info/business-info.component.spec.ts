import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BusinessInfoComponent } from './business-info.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('BusinessInfoComponent', () => {
  let component: BusinessInfoComponent;
  let fixture: ComponentFixture<BusinessInfoComponent>;
  let toastrService:ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessInfoComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [ToastrService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
