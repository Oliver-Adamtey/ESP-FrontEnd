import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { TokenComponent } from './token.component';

describe('TokenComponent', () => {
  let component: TokenComponent;
  let fixture: ComponentFixture<TokenComponent>;
  let toastrService:ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [ToastrService]  // Add ToastrService to the providers array in TestBed configuration
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
