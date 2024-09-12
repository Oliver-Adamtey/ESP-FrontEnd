import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUsersNotificationComponent } from './all-users-notification.component';

describe('AllUsersNotificationComponent', () => {
  let component: AllUsersNotificationComponent;
  let fixture: ComponentFixture<AllUsersNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllUsersNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllUsersNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
