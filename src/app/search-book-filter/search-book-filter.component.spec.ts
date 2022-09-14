import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookFilterComponent } from './search-book-filter.component';

describe('SearchBookFilterComponent', () => {
  let component: SearchBookFilterComponent;
  let fixture: ComponentFixture<SearchBookFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBookFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBookFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
