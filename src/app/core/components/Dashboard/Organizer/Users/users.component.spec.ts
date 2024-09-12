import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let toasterService: ToastrService;

  const MocktoastConfig = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [
        {provide:toasterService, useClass:ToastrService},
        {provide:new InjectionToken('Toasconfi'), useValue:MocktoastConfig},
        {provide: ActivatedRoute, useValue: {snapshot: {params: {userId: '1'}}}}  // Mock ActivatedRoute for testing purposes
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
