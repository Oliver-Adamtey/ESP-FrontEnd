import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UsersAdminComponent } from './users-admin.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

describe('UsersAdminComponent', () => {
  let component: UsersAdminComponent;
  let fixture: ComponentFixture<UsersAdminComponent>;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersAdminComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } },
      ]  // Add ToastrService to the component providers
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
