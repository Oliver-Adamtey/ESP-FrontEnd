import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrganizerEventComponent } from './organizer-event.component';
import { ActivatedRoute } from '@angular/router';

describe('OrganizerEventComponent', () => {
  let component: OrganizerEventComponent;
  let fixture: ComponentFixture<OrganizerEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerEventComponent, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: { id: 'test-event-id' } } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
