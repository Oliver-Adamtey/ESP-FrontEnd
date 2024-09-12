import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './settings.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let toastrService:ToastrService;

  const MocktoastConfig = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [
        {provide:ToastrService, useClass:ToastrService},
        {provide: new InjectionToken('ToastConfig'), useValue:MocktoastConfig},
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
