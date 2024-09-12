import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatisticsComponent } from '@components/Dashboard/Admin/statistics/statistics.component';
import { Analytics } from '@interface/Admin/admin-analytics';
import { BaseChartDirective } from 'ng2-charts';
import { AdminService } from '@services/Admin/admin-dashboard/admin.service';
import { of } from 'rxjs';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let adminServiceSpy: jasmine.SpyObj<AdminService>;
  

  beforeEach(async () => {

    const statisticsData:Analytics = {
      totalEventsCreated: 100,
      totalTicketsEverSold: 200,
      allRevenueMade: 30000,
      currentYearData: {
        attendees: {
          January: 50,
          February: 60,
          March: 70,
          April: 80,
          May: 90,
          June: 100,
          July: 110,
          August: 120,
          September: 130,
          October: 140,
          November: 150,
          December: 160,
        },
        organizers: {
          January: 10,
          February: 20,
          March: 30,
          April: 40,
          May: 50,
          June: 60,
          July: 70,
          August: 80,
          September: 90,
          October: 100,
          November: 110,
          December: 120
        }
      },
      numberOfAllUsers: 0,
      regularUsers: 0,
      numberOfAttendees: 0,
      numberOfOrganizers: 0,
      numberOfRegisteredAttendeesInCurrentMonth: 0,
      numberOfRegisteredOrganizersInCurrentMonth: 0,
      totalOrganizersActive: 0,
      totalAttendeesActive: 0,
      sumOfAttendeesAndOrganizers: 0,
      attendeePercentage: 0,
      organizerPercentage: 0,
      allAllocatedTickets: 0,
      percentageSold: 0,
      dailySoldTickets: 0
    }

    adminServiceSpy = jasmine.createSpyObj('AdminService', ['getAnalytics']);;
    adminServiceSpy.getAnalytics.and.returnValue(of(statisticsData));

    await TestBed.configureTestingModule({
      imports: [StatisticsComponent, BaseChartDirective],
      providers:[
        {
          provide: AdminService,
          useValue: adminServiceSpy
        },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize lineChartData with correct data', () => {
    const expectedLabels = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const expectedAttendeesData = [
      50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160
    ];

    const expectedOrganizersData = [
      10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120
    ];

    expect(component.lineChartData.labels).toEqual(expectedLabels);
    expect(component.lineChartData.datasets[0].data).toEqual(expectedAttendeesData);
    expect(component.lineChartData.datasets[1].data).toEqual(expectedOrganizersData);
    expect(component.lineChartData.datasets[0].label).toBe('attendees');
    expect(component.lineChartData.datasets[1].label).toBe('organizers');
  });

})

