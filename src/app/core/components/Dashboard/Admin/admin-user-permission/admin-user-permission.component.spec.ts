import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserPermissionComponent } from './admin-user-permission.component';

describe('AdminUserPermissionComponent', () => {
  let component: AdminUserPermissionComponent;
  let fixture: ComponentFixture<AdminUserPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUserPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
