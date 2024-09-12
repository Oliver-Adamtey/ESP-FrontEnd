import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { OrganizerTopBarComponent } from './organizer-top-bar.component';
import { InjectionToken } from '@angular/core';

describe('OrganizerTopBarComponent', () => {
  let component: OrganizerTopBarComponent;
  let fixture: ComponentFixture<OrganizerTopBarComponent>;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerTopBarComponent, HttpClientModule, ToastrModule.forRoot()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
