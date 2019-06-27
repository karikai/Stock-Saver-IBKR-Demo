import { TestBed } from '@angular/core/testing';

import { StockFetcherService } from './stock-fetcher.service';

describe('StockFetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockFetcherService = TestBed.get(StockFetcherService);
    expect(service).toBeTruthy();
  });
});
