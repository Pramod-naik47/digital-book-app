import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SearchBookService } from './search-book.service';

describe('SearchBookService', () => {
  let service: SearchBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule]
    });
    service = TestBed.inject(SearchBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
