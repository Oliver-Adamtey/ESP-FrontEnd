import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeactivateComponent } from './user-deactivate.component';

describe('UserDeactivateComponent', () => {
  let component: UserDeactivateComponent;
  let fixture: ComponentFixture<UserDeactivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDeactivateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
