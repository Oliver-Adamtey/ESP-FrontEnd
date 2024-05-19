import { TestBed } from '@angular/core/testing';

import { CreatedEventsService } from './created-events.service';

describe('CreatedEventsService', () => {
  let service: CreatedEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatedEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
