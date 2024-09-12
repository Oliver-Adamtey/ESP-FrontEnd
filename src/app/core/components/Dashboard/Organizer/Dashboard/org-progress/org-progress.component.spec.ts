import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgProgressComponent } from './org-progress.component';

describe('OrgProgressComponent', () => {
  let component: OrgProgressComponent;
  let fixture: ComponentFixture<OrgProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrgProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
