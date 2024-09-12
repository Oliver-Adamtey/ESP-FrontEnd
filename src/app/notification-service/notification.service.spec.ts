import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { ToastrService } from 'ngx-toastr';

describe('NotificationService', () => {
  let service: NotificationService;
  let toastrService:ToastrService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService, { provide: ToastrService, useValue: jasmine.createSpyObj('ToastrService', ['success', 'error', 'warning']) }]
    });
    service = TestBed.inject(NotificationService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
