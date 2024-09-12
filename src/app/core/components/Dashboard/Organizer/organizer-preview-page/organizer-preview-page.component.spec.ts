import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrganizerPreviewPageComponent } from './organizer-preview-page.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


const MocktoastConfig = {}

describe('OrganizerPreviewPageComponent', () => {
  let component: OrganizerPreviewPageComponent;
  let fixture: ComponentFixture<OrganizerPreviewPageComponent>;
  let toasterServices:ToastrService

  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerPreviewPageComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [
        {provide:ToastrService, useClass: ToastrService},
        {provide:new InjectionToken('ToastConfig'), useValue:MocktoastConfig},
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizerPreviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
