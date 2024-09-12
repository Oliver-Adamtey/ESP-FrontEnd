import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Chart } from 'chart.js';
import { DashboardAdminComponent } from '@components/Dashboard/Admin/dashboard-admin/dashboard-admin.component';
import { Analytics } from '@interface/Admin/admin-analytics';
import { plugins } from 'chart.js';
import { environment } from '@environments/environment';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';


describe('DashboardAdminComponent', () => {
  let component: DashboardAdminComponent;
  let fixture: ComponentFixture<DashboardAdminComponent>;
  let chartSpy:jasmine.Spy;
  let routerSpy:jasmine.SpyObj<Router>

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      providers: [{provide:Router, useValue:routerSpy},
        {
          provide:ActivatedRoute,
          useValue:{
            params: of({id:123}),
            snapshot: {
              paraMap:{
                get:(key:string) => '123'
              }
            }
          }
        }
      ],
      imports: [DashboardAdminComponent, HttpClientTestingModule],
  
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should confirm logout, clear localStorage, and navigate to login', () => {
    spyOn(window, 'confirm').and.returnValue(true);
  
    spyOn(localStorage, 'removeItem');
    spyOn(localStorage, 'clear');
  
    component.logout();
  
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to logout?');
    expect(localStorage.removeItem).toHaveBeenCalledWith(environment.ADMIN_TOKEN);
    expect(localStorage.clear).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not log out if the user cancels the confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    spyOn(localStorage, 'removeItem');
    spyOn(localStorage, 'clear');

    component.logout();

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to logout?');
    expect(localStorage.removeItem).not.toHaveBeenCalled();
    expect(localStorage.clear).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalledWith(['/login']);
  })
});
