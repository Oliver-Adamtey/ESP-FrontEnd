import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RecommendedEventsComponent } from './recommended-events.component';

describe('RecommendedEventsComponent', () => {
  let component: RecommendedEventsComponent;
  let fixture: ComponentFixture<RecommendedEventsComponent>;
  let toastrService: ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedEventsComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [ToastrService]  // Add ToastrService to the providers list in the module
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecommendedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
