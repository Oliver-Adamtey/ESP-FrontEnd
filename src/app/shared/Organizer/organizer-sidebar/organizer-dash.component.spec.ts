import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OrganizerDashComponent } from './organizer-dash.component';

describe('OrganizerDashComponent', () => {
  let component: OrganizerDashComponent;
  let fixture: ComponentFixture<OrganizerDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerDashComponent, HttpClientModule],
      providers:[
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } } 
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
