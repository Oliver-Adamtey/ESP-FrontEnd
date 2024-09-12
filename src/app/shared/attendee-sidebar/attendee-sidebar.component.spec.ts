import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AttendeeSidebarComponent } from './attendee-sidebar.component';

describe('AttendeeSidebarComponent', () => {
  let component: AttendeeSidebarComponent;
  let fixture: ComponentFixture<AttendeeSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeSidebarComponent, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: { id: '123' } } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
