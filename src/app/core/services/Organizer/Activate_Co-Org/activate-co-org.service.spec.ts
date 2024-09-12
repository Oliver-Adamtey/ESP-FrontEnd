import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivateCoOrgService } from './activate-co-org.service';

describe('ActivateCoOrgService', () => {
  let service: ActivateCoOrgService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ActivateCoOrgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
