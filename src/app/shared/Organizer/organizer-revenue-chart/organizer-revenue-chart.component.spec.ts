import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrganizerRevenueChartComponent } from './organizer-revenue-chart.component';

describe('OrganizerRevenueChartComponent', () => {
  let component: OrganizerRevenueChartComponent;
  let fixture: ComponentFixture<OrganizerRevenueChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerRevenueChartComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerRevenueChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
