import { TestBed } from '@angular/core/testing';

import { StockListService } from './stock-list.service';

describe('StockListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockListService = TestBed.get(StockListService);
    expect(service).toBeTruthy();
  });
});
