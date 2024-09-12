import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminPaymentIntegrationComponent } from './admin-payment-integration.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

describe('AdminPaymentIntegrationComponent', () => {
  let component: AdminPaymentIntegrationComponent;
  let fixture: ComponentFixture<AdminPaymentIntegrationComponent>;
  let toastrService:ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPaymentIntegrationComponent, HttpClientModule, ToastrModule.forRoot()],
      providers:[
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPaymentIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
