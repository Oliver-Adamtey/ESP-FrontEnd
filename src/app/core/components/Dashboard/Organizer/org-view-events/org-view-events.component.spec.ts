import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrgViewEventsComponent } from './org-view-events.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

describe('OrgViewEventsComponent', () => {
  let component: OrgViewEventsComponent;
  let fixture: ComponentFixture<OrgViewEventsComponent>;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgViewEventsComponent, HttpClientModule, ToastrModule.forRoot()],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'testOrg'
              }
            }
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrgViewEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

