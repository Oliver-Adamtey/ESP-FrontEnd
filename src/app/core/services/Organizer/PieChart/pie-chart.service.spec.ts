import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { PieChartService } from './pie-chart.service';

describe('PieChartService', () => {
  let service: PieChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule]
    });
    service = TestBed.inject(PieChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
