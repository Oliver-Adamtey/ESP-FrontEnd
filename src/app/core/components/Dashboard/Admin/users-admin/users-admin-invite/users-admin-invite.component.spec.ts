import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAdminInviteComponent } from './users-admin-invite.component';

describe('UsersAdminInviteComponent', () => {
  let component: UsersAdminInviteComponent;
  let fixture: ComponentFixture<UsersAdminInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersAdminInviteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersAdminInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
