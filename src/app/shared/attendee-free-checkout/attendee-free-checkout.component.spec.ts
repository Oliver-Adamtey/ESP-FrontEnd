import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AttendeeFreeCheckoutComponent } from './attendee-free-checkout.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

describe('AttendeeFreeCheckoutComponent', () => {
  let component: AttendeeFreeCheckoutComponent;
  let fixture: ComponentFixture<AttendeeFreeCheckoutComponent>;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeFreeCheckoutComponent, HttpClientModule, ToastrModule.forRoot()],
      providers:[
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeFreeCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

