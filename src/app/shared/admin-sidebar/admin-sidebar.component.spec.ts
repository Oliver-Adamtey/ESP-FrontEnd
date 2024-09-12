import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminSidebarComponent } from '@component/admin-sidebar/admin-sidebar.component';
import { TokenService } from '@services/token/token.service';

describe('AdminSidebarComponent', () => {
  let component: AdminSidebarComponent;
  let fixture: ComponentFixture<AdminSidebarComponent>;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let tokenServiceSpy = jasmine.createSpyObj('TokenService', ['clear']);
  let ActivatedRouteStub = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSidebarComponent],
      providers:[
        {provide:Router, useValue:routerSpy,},
        {provide:TokenService, useValue:tokenServiceSpy},
        {provide: ActivatedRoute, useValue:ActivatedRouteStub}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should clear token and navigate to login on confirmaLogout', () => {
    component.confirmLogout();

    expect(tokenServiceSpy.clear).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set isLogoutModalVisible to true when showLogoutConfirmation is called', () => {
    component.showLogoutConfirmation(); 

    expect(component.isLogoutModalVisible).toBeTrue(); 
  });

  it('should set isLogoutModalVisible to false when cancelLogout is called', () => {
    component.isLogoutModalVisible = true; 

    component.cancelLogout(); 

    expect(component.isLogoutModalVisible).toBeFalse(); 
  });
});
