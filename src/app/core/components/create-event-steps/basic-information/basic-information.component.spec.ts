import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationService } from '@notifications//notification.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BasicInformationComponent } from './basic-information.component';

describe('BasicInformationComponent', () => {
  let component: BasicInformationComponent;
  let fixture: ComponentFixture<BasicInformationComponent>;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicInformationComponent, NotificationService, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
