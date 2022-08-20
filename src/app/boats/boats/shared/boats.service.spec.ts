import { TestBed } from '@angular/core/testing';

import { BoatsService } from './boats.service';

describe('BoatsService', () => {
  let service: BoatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
